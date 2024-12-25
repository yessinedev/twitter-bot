import twitterClient from "@/lib/twitter";
import { NextResponse } from "next/server";


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
