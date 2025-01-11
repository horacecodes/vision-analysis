"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { AnalysisType, ANALYSIS_PROMPTS } from "@/lib/prompts"

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function analyzeImageAction(
  imageData: string,
  type: AnalysisType,
): Promise<string> {
  try {
    // Remove data URL prefix if present
    const base64Image = imageData.replace(/^data:image\/[a-z]+;base64,/, "")

    // Get the Gemini 1.5 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Create prompt parts with specific instructions for conciseness
    const prompt = `${ANALYSIS_PROMPTS[type]} Keep the response focused and direct. Do not use any markdown formatting or special characters.`
    const imageParts = [
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg",
        },
      },
    ]

    // Generate content
    const result = await model.generateContent([prompt, ...imageParts])
    const response = await result.response
    let text = response.text()

    // Clean up the response
    text = text
      .replace(
        /^(Here's|Here is|This is|I see|I can see|Let me|Allow me to).+?\n/i,
        "",
      )
      .replace(/\n*In conclusion.+$/i, "")
      .replace(/\*\*/g, "") // Remove markdown bold
      .replace(/\*/g, "") // Remove markdown italic
      .replace(/`/g, "") // Remove markdown code
      .replace(/^-\s*/gm, "") // Remove list markers
      .replace(/^\s*•\s*/gm, "") // Remove bullet points
      .trim()

    return text
  } catch (error) {
    console.error("Error analyzing image:", error)
    throw new Error("Failed to analyze image. Please try again.")
  }
}
