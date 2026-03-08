import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Blog — Maciej Tyra",
  description:
    "Articles about web development, Next.js, SEO, performance optimization, and building digital products. Written by Maciej Tyra, Full-Stack Developer & CTO at Digitay.pl.",
  openGraph: {
    title: "Blog — Maciej Tyra",
    description:
      "Articles about web development, Next.js, SEO, and building digital products.",
    type: "website",
  },
};

export const revalidate = 60;

async function getPosts(language?: string, tag?: string, page = 1) {
  const limit = 12;
  const empty = { posts: [] as never[], total: 0, totalPages: 0, allTags: [] as string[] };

  try {
    const where: Record<string, unknown> = {
      status: "published",
      publishedAt: { lte: new Date() },
    };

    if (language) where.language = language;

    const allPosts = await prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        language: true,
        publishedAt: true,
        coverImage: true,
        tags: true,
        createdAt: true,
      },
    });

    let filtered = allPosts;
    if (tag) {
      filtered = allPosts.filter((p) => {
        const tags: string[] = JSON.parse(p.tags || "[]");
        return tags.some((t) => t.toLowerCase() === tag.toLowerCase());
      });
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    const allTags = new Set<string>();
    allPosts.forEach((p) => {
      const tags: string[] = JSON.parse(p.tags || "[]");
      tags.forEach((t) => allTags.add(t));
    });

    return {
      posts: paginated.map((p) => ({
        ...p,
        tags: JSON.parse(p.tags || "[]") as string[],
        publishedAt: p.publishedAt?.toISOString() || null,
        createdAt: p.createdAt.toISOString(),
      })),
      total,
      totalPages: Math.ceil(total / limit),
      allTags: Array.from(allTags).sort(),
    };
  } catch {
    return empty;
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; tag?: string; page?: string }>;
}) {
  const params = await searchParams;
  const language = params.lang || undefined;
  const tag = params.tag || undefined;
  const page = parseInt(params.page || "1");

  const { posts, total, totalPages, allTags } = await getPosts(language, tag, page);

  return (
    <BlogList
      posts={posts}
      total={total}
      totalPages={totalPages}
      currentPage={page}
      allTags={allTags}
      activeLanguage={language}
      activeTag={tag}
    />
  );
}
