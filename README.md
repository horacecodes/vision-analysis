# Vision Analysis

A modern image analysis tool powered by Google's Gemini AI that provides detailed image analysis, Instagram captions, and AI art prompts.

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
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
bun dev
```

## Environment Variables

- `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key (Get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

## License

MIT License

Copyright (c) 2024 Horace

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
