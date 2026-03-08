import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const topics = await prisma.scheduledTopic.findMany({
    orderBy: { scheduledAt: "asc" },
  });

  return NextResponse.json({ topics });
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { topic, keywords, language, scheduledAt } = await req.json();

  if (!topic || !scheduledAt) {
    return NextResponse.json(
      { error: "Topic and scheduledAt are required" },
      { status: 400 }
    );
  }

  const entry = await prisma.scheduledTopic.create({
    data: {
      topic,
      keywords: keywords || "",
      language: language || "pl",
      scheduledAt: new Date(scheduledAt),
    },
  });

  return NextResponse.json(entry, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  try {
    await prisma.scheduledTopic.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
