import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostContent from "./BlogPostContent";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { status: "published" },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return { title: "Post Not Found" };

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;

  return {
    title: `${title} — Maciej Tyra`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: ["Maciej Tyra"],
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || post.status !== "published") {
    notFound();
  }

  const prevNext = await Promise.all([
    prisma.post.findFirst({
      where: {
        status: "published",
        publishedAt: { lt: post.publishedAt || undefined },
      },
      orderBy: { publishedAt: "desc" },
      select: { title: true, slug: true },
    }),
    prisma.post.findFirst({
      where: {
        status: "published",
        publishedAt: { gt: post.publishedAt || undefined },
      },
      orderBy: { publishedAt: "asc" },
      select: { title: true, slug: true },
    }),
  ]);

  return (
    <BlogPostContent
      post={{
        ...post,
        tags: JSON.parse(post.tags || "[]"),
        publishedAt: post.publishedAt?.toISOString() || null,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      }}
      prev={prevNext[0]}
      next={prevNext[1]}
    />
  );
}
