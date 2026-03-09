import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const authed = await isAuthenticated();
    const where = authed ? {} : { status: "published", publishedAt: { lte: new Date() } };

    const posts = await prisma.post.findMany({
      where,
      select: { tags: true },
    });

    const tagCounts = new Map<string, number>();
    const tagDisplay = new Map<string, string>();

    posts.forEach((p) => {
      const tags: string[] = JSON.parse(p.tags || "[]");
      tags.forEach((t) => {
        const trimmed = t.trim();
        if (!trimmed) return;
        const key = trimmed.toLowerCase();
        tagCounts.set(key, (tagCounts.get(key) || 0) + 1);
        if (!tagDisplay.has(key)) tagDisplay.set(key, trimmed);
      });
    });

    const tags = Array.from(tagCounts.entries())
      .map(([key, count]) => ({ tag: tagDisplay.get(key) || key, count }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json(tags);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
