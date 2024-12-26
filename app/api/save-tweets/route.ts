import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { tweets } = await request.json();
    const savedTweets = await prisma.tweet.createMany({
      data: tweets.map((content: any) => ({ content: content, })),
    });
    return NextResponse.json({ savedTweets });
  } catch (error: any) {
    console.error("Save Tweets API Error:", error.data || error.message);
    return NextResponse.json(
      { error: error.message || "Failed to save tweets" },
      { status: 500 }
    );
  }
}

