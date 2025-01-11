import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

export type AnalysisType =
  | "instagram"
  | "detailed"
  | "midjourney"
  | "stable-diffusion"

const ANALYSIS_PROMPTS: Record<AnalysisType, string> = {
  instagram:
    "Create a single engaging Instagram caption for this image with relevant hashtags. No explanations, just the caption and hashtags. Do not use any markdown formatting.",
  detailed:
    "Provide a comprehensive analysis of this image under these categories without any markdown formatting:\n\nObjects: List all visible objects, their positions, sizes, and notable features\n\nColors: Describe the color palette, including primary and secondary colors, tones, shading, and how they interact\n\nComposition: Analyze the layout, focal points, perspective, depth, balance, and how elements are arranged\n\nMood: Describe the atmosphere, emotional impact, and overall feeling conveyed\n\nStyle: Detail the artistic style, techniques used, visual effects, and any unique characteristics\n\nLighting: Describe the lighting conditions, shadows, highlights, and their effects\n\nTextures: Identify and describe any notable textures or patterns\n\nBe specific and detailed but concise. No explanations or conclusions.",
  midjourney:
    "Generate only the Midjourney prompt parameters. Format: /imagine [prompt]. No explanations, markdown, or additional text.",
  "stable-diffusion":
    "Generate only the Stable Diffusion prompt. Format: [prompt] --parameters. No explanations, markdown, or additional text.",
}

export async function analyzeImage(
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
