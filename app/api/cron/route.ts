import prisma from "@/lib/prisma";
import twitterClient from "@/lib/twitter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Get the start and end of the current day
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const scheduledTweets = await prisma.tweet.findMany({
      where: {
        scheduledDate: {
          gte: startOfDay.toISOString(), // From start of day
          lt: endOfDay.toISOString(),   // Until start of next day
        },
        status: "SCHEDULED",
      },
      orderBy: {
        scheduledTime: "asc",
      },
    });

    for (const tweet of scheduledTweets) {
      try {
        await twitterClient.v2.tweet(tweet.content);
        // Update tweet status to "posted"
        await prisma.tweet.update({
          where: { id: tweet.id },
          data: { status: "POSTED" },
        });
      } catch (error) {
        console.error(`Failed to post tweet ID ${tweet.id}:`, error);
      }
    }
    return NextResponse.json({
      message: `${scheduledTweets.length} tweets processed.`,
    });
  } catch (error) {
    console.error("Error processing scheduled tweets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
