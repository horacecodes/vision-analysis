# Vision Analysis

A modern image analysis tool powered by Google's Gemini AI that provides detailed image analysis, Instagram captions, and AI art prompts.

[![Vision Analysis Preview](https://vision-analysis.vercel.app/screenshot.png)](https://vision-analysis.vercel.app/)

🔗 [Try it live](https://vision-analysis.vercel.app/)

## Features

- 🖼️ **Image Analysis**: Detailed breakdown of objects, colors, composition, mood, lighting, and textures
- 📱 **Instagram Captions**: Generate engaging captions with relevant hashtags
- 🎨 **AI Art Prompts**: Create prompts for Midjourney and Stable Diffusion
- ✨ **Modern UI**: Sleek dark theme with glassmorphism effects
- 📋 **Copy to Clipboard**: Easy copying of results
- 📱 **Responsive**: Works on all devices

## Tech Stack

- Next.js 15.1.3
- TypeScript
- Tailwind CSS
- Shadcn UI
- Google Gemini AI
- React Dropzone

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/horacecodes/vision-analysis.git
cd vision-analysis
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file:

```env
GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
bun dev
```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (Get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Security Notes

- The application uses server-side API calls to protect your API keys
- Environment variables are properly secured and not exposed to the client
- All image analysis is performed on the server side

