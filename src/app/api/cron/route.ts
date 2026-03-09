import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateBlogPost } from "@/lib/ai-generate";
import { normalizeTags } from "@/lib/blog-utils";

export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pendingTopics = await prisma.scheduledTopic.findMany({
    where: {
      generated: false,
      scheduledAt: { lte: new Date() },
    },
    take: 3,
    orderBy: { scheduledAt: "asc" },
  });

  if (pendingTopics.length === 0) {
    return NextResponse.json({ message: "No pending topics", generated: 0 });
  }

  const results: { topicId: number; postId?: number; error?: string }[] = [];

  for (const topic of pendingTopics) {
    try {
      const generated = await generateBlogPost(
        topic.topic,
        topic.language,
        topic.keywords || undefined
      );

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
          tags: JSON.stringify(normalizeTags(generated.tags)),
        },
      });

      await prisma.scheduledTopic.update({
        where: { id: topic.id },
        data: { generated: true, postId: post.id },
      });

      results.push({ topicId: topic.id, postId: post.id });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      results.push({ topicId: topic.id, error: message });
    }
  }

  return NextResponse.json({
    message: `Processed ${results.length} topics`,
    generated: results.filter((r) => r.postId).length,
    results,
  });
}
