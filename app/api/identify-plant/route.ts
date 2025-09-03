import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert base64 image to the format Gemini expects
    const base64Data = image.split(",")[1];
    const mimeType = image.split(";")[0].split(":")[1];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze this plant image and provide detailed information in the following JSON format:
    {
      "name": "Common name of the plant",
      "scientificName": "Scientific/botanical name",
      "family": "Plant family name",
      "description": "Brief description of the plant (2-3 sentences)",
      "careInstructions": "Detailed care instructions (4-5 sentences)",
      "sunlight": "Sunlight requirements (e.g., 'Full sun', 'Partial shade', etc.)",
      "water": "Watering requirements (e.g., 'Water when soil is dry', 'Keep soil moist', etc.)",
      "difficulty": "Care difficulty level (e.g., 'Beginner', 'Intermediate', 'Advanced')"
    }

    Please be accurate and provide helpful information. If you cannot identify the plant with confidence, provide your best guess but mention the uncertainty in the description.
    `;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const plantInfo = JSON.parse(jsonMatch[0]);

    return NextResponse.json(plantInfo);
  } catch (error) {
    console.error("Error identifying plant:", error);
    return NextResponse.json(
      { error: "Failed to identify plant" },
      { status: 500 }
    );
  }
}

// Handle CORS for client requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
