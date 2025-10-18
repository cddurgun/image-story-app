import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, settings } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.TOGETHER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Together AI API key not configured. Please add TOGETHER_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    // Together AI API endpoint for FLUX.1-schnell (fast text-to-image)
    const response = await fetch(
      "https://api.together.xyz/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "black-forest-labs/FLUX.1-schnell",
          prompt: prompt,
          width: settings?.width || 1024,
          height: settings?.height || 768,
          steps: settings?.num_inference_steps || 4,
          n: 1,
          response_format: "b64_json",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Together AI API Error Response:", errorText);
      console.error("Request was:", JSON.stringify({
        prompt,
        width: settings?.width || 1024,
        height: settings?.height || 768,
        steps: settings?.num_inference_steps || 4,
      }));
      return NextResponse.json(
        { error: `Together AI API Error: ${response.statusText} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Together AI returns base64 encoded image in data array
    if (data.data && data.data[0]?.b64_json) {
      return NextResponse.json({
        imageUrl: `data:image/png;base64,${data.data[0].b64_json}`,
        success: true,
      });
    } else if (data.data && data.data[0]?.url) {
      // If URL format is returned instead
      return NextResponse.json({
        imageUrl: data.data[0].url,
        success: true,
      });
    } else {
      console.error("Unexpected API response format:", JSON.stringify(data));
      return NextResponse.json(
        { error: "No image returned from API" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
