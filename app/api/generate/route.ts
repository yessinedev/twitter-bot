import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Access your API key and initialize the AI model
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Retrieve the data from the request body
    const data = await req.json();
    const prompt = data.prompt;
    const count = data.count;

    // Adjust the prompt to instruct the model to generate multiple tweets
    const result = await model.generateContent(
      `Generate ${count} engaging Twitter posts based on the following subjects: "${prompt}". 
      Each post should:
    - Be concise (under 280 characters)
    - Use an engaging tone (informative, humorous, or inspiring).
    - Include relevant hashtags
    - Be formatted as a numbered list (1 to ${count})
    - Avoid links or placeholders for links.`
    );

    const response = result.response;

    // Parse the response to extract individual tweets
    const output = response.text();
    const tweets = output
      .split("\n")
      .filter((line) => line.trim().match(/^\d+\./)) // Keep lines formatted as "1. Tweet..."
      .map((tweet) => tweet.replace(/^\d+\.\s*/, "").trim()); // Remove numbering

    // Return the list of tweets as a JSON response
    return NextResponse.json({ tweets });
  } catch (error) {
    console.error("Error generating tweets:", error);
    return NextResponse.json(
      { error: "Failed to generate tweets. Please try again later." },
      { status: 500 }
    );
  }
}
