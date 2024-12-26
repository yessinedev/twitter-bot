
import twitterClient from "@/lib/twitter";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    console.log("Posting tweet:", content);
    const tweet = await twitterClient.v2.tweet(content);
    console.log("Tweet posted:", tweet);
    return NextResponse.json({ tweet });
  } catch (error: any) {
    console.error("Tweet API Error:", error.data || error.message);
    return NextResponse.json(
      { error: error.message || "Failed to post tweet" },
      { status: 500 }
    );
  }
}

//fetch tweets from prisma

export async function GET() {
  try {
    const tweets = await prisma.tweet.findMany({
      orderBy: [
        { scheduledDate: "desc" }, 
        { scheduledTime: "desc" },
      ],
    });
    return NextResponse.json(tweets);
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const tweet = await prisma.tweet.update({
      where: { id: body.id },
      data: body,
    });
    return NextResponse.json(tweet);
  } catch (error) {
    console.error("Error updating tweet:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
