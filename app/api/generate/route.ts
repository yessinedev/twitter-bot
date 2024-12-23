import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Create an asynchronous function POST to handle POST 
// request with parameters request and response.
export async function POST(req: NextRequest) {

    try {
        // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

        // Ininitalise a generative model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        // Retrieve the data we recieve as part of the request body
        const data = await req.json()
        console.log(data)
        // Define a prompt varibale
        const prompt = data.prompt
        console.log(prompt)
        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(`Generate a Twitter post based on the following subject: ${prompt}. 
      The post should be engaging, concise (under 280 characters), and include relevant hashtags. do not include any link to the post`)
        const response = result.response;
        const output = response.text();
        // Send the llm output as a server reponse object
        return NextResponse.json({ output: output })
    } catch (error) {
        console.error(error)
    }
}