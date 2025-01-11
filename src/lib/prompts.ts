export type AnalysisType =
  | "instagram"
  | "detailed"
  | "midjourney"
  | "stable-diffusion"

export const ANALYSIS_PROMPTS: Record<AnalysisType, string> = {
  detailed:
    "Analyze this image in detail. Break down your analysis into these sections: Composition, Colors, Lighting, Subject Matter, Mood, and Technical Details. For each section, provide a concise but thorough description.",
  instagram:
    "Generate an engaging Instagram caption for this image. Include relevant hashtags at the end. Keep the caption authentic and engaging, and limit to 5-7 relevant hashtags.",
  midjourney:
    "Create a detailed Midjourney prompt that would generate an image similar to this one. Include specific style, lighting, composition, and technical parameters. Format as: [description] --ar [aspect ratio] --v 6 --s [style] --q [quality]",
  "stable-diffusion":
    "Create a detailed Stable Diffusion prompt that would generate an image similar to this one. Include specific style, lighting, composition, and technical parameters. Format as: [description] --negative [negative prompt] --steps 50 --cfg 7.5",
}
