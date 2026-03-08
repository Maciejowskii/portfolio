import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const language = searchParams.get("language");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const publicOnly = searchParams.get("public") === "true";

  const where: Record<string, unknown> = {};

  if (publicOnly) {
    where.status = "published";
    where.publishedAt = { lte: new Date() };
  } else {
    if (status) where.status = status;
  }

  if (language) where.language = language;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: publicOnly
        ? {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            language: true,
            status: true,
            publishedAt: true,
            coverImage: true,
            tags: true,
            createdAt: true,
          }
        : undefined,
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({
    posts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    title,
    slug,
    excerpt,
    content,
    language,
    status,
    publishedAt,
    metaTitle,
    metaDescription,
    coverImage,
    tags,
  } = body;

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "Title, slug, and content are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt: excerpt || "",
      content,
      language: language || "pl",
      status: status || "draft",
      publishedAt: publishedAt ? new Date(publishedAt) : null,
      metaTitle: metaTitle || "",
      metaDescription: metaDescription || "",
      coverImage: coverImage || "",
      tags: JSON.stringify(tags || []),
    },
  });

  return NextResponse.json(post, { status: 201 });
}
