import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { generateBlogPost } from "@/lib/ai-generate";
import { prisma } from "@/lib/prisma";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { topic, language, keywords } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  try {
    const generated = await generateBlogPost(topic, language || "pl", keywords);

    const existing = await prisma.post.findUnique({
      where: { slug: generated.slug },
    });
    if (existing) {
      generated.slug = `${generated.slug}-${Date.now().toString(36)}`;
    }

    const post = await prisma.post.create({
      data: {
        title: generated.title,
        slug: generated.slug,
        excerpt: generated.excerpt,
        content: generated.content,
        language: generated.language,
        status: "draft",
        metaTitle: generated.metaTitle,
        metaDescription: generated.metaDescription,
        coverImage: generated.coverImage,
        tags: JSON.stringify(generated.tags),
      },
    });

    return NextResponse.json({ success: true, postId: post.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
