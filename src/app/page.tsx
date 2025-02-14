"use client"

import { useState } from "react"
import { ImageUpload } from "@/components/ui/image-upload"
import { AnalysisOptions } from "@/components/ui/analysis-options"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Copy, Check } from "lucide-react"
import { analyzeImageAction } from "./actions"
import { cn } from "@/lib/utils"
import { AnalysisType } from "@/lib/prompts"
import { useToast } from "@/hooks/use-toast"

function CopyButton({ text }: { text: string }) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "The text has been copied to your clipboard.",
      })
      // Reset the copied state after 1 second
      setTimeout(() => setCopied(false), 1000)
    } catch (err) {
      console.error("Failed to copy text:", err)
      toast({
        title: "Failed to copy",
        description: "There was an error copying the text to your clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-8 w-8 text-zinc-400 hover:text-white transition-colors"
      onClick={copyToClipboard}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}

function formatResult(result: string, type: AnalysisType) {
  switch (type) {
    case "detailed":
      const sections = result.split("\n\n").filter(Boolean)
      return (
        <div className="space-y-6">
          {sections.map((section) => {
            const [title, ...items] = section.split(":")
            return (
              <div key={title} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-zinc-200">
                    {title.trim()}
                  </h3>
                  <CopyButton text={items.join(":").trim()} />
                </div>
                <div className="pl-4 border-l-2 border-zinc-800">
                  <p className="text-zinc-400">{items.join(":").trim()}</p>
                </div>
              </div>
            )
          })}
        </div>
      )

    case "instagram":
      const caption = result.split("#")[0]
      const hashtags = result.match(/#[a-zA-Z0-9]+/g) || []
      return (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <p className="text-zinc-200 text-lg flex-1">{caption}</p>
            <CopyButton text={result} />
          </div>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((hashtag) => (
              <span key={hashtag} className="text-blue-400 text-sm">
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      )

    case "midjourney":
    case "stable-diffusion":
      const [prompt, ...params] = result.split("--")
      return (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="p-4 bg-zinc-900 rounded-lg">
                <p className="text-zinc-200 font-mono">{prompt.trim()}</p>
              </div>
            </div>
            <CopyButton text={result} />
          </div>
          {params.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {params.map((param) => (
                <span
                  key={param}
                  className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-mono"
                >
                  --{param.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      )
  }
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [analysisType, setAnalysisType] = useState<AnalysisType | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!selectedImage || !analysisType) return

    try {
      setLoading(true)
      setAnalyzing(true)
      setResult(null)
      setLoadingProgress(0)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      // Convert image to base64 first
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            resolve(e.target.result.toString())
          }
        }
        reader.onerror = reject
        reader.readAsDataURL(selectedImage)
      })

      // Use the server action to analyze the image
      const analysisResult = await analyzeImageAction(base64Image, analysisType)
      setResult(analysisResult)
      setLoadingProgress(100)
      clearInterval(progressInterval)
    } catch (error) {
      console.error("Error analyzing image:", error)
      setResult(
        "An error occurred while analyzing the image. Please try again.",
      )
    } finally {
      setLoading(false)
      setLoadingProgress(0)
      setAnalyzing(false)
    }
  }

  return (
    <main className="flex-1 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-zinc-900 to-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid lg:grid-cols-[1fr,400px] gap-6">
          {/* Left Column - Upload and Options */}
          <div className="space-y-6">
            <ImageUpload
              onImageSelect={(file) => {
                setSelectedImage(file)
                setResult(null)
              }}
              className="min-h-[300px] border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 backdrop-blur-xl"
            />

            <AnalysisOptions
              selected={analysisType}
              onSelect={(type) => {
                setAnalysisType(type)
                setResult(null)
              }}
            />

            <Button
              className={cn(
                "w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors relative overflow-hidden",
                analyzing && "cursor-not-allowed opacity-80"
              )}
              size="lg"
              onClick={handleAnalyze}
              disabled={!selectedImage || !analysisType || loading || analyzing}
            >
              {loading && (
                <div
                  className="absolute inset-0 bg-blue-500/20 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(${loadingProgress - 100}%)`,
                  }}
                />
              )}
              <span className="relative flex items-center justify-center">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing... {loadingProgress}%
                  </>
                ) : analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Image...
                  </>
                ) : (
                  "Analyze Image"
                )}
              </span>
            </Button>
          </div>

          {/* Right Column - Results */}
          <Card className="h-[calc(100vh-13rem)] lg:sticky lg:top-24 backdrop-blur-3xl bg-zinc-900/50 border-zinc-800">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-lg font-medium">Analysis Results</h2>
              {result && !loading && !analyzing && (
                <CopyButton text={result} />
              )}
            </div>
            <div className="p-4 h-[calc(100%-5rem)] overflow-auto">
              {loading || analyzing ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-zinc-800 rounded-full">
                        <div
                          className="absolute inset-0 border-4 border-blue-500 rounded-full"
                          style={{
                            clipPath: `polygon(0 0, ${loadingProgress}% 0, ${loadingProgress}% 100%, 0 100%)`,
                          }}
                        />
                      </div>
                      <Loader2 className="w-8 h-8 animate-spin text-blue-500 absolute inset-0 m-auto" />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-zinc-300">
                        {analyzing ? "Analyzing your image..." : "Processing..."}
                      </p>
                      <p className="text-sm text-zinc-500">
                        This may take a few seconds
                      </p>
                    </div>
                  </div>
                </div>
              ) : result && analysisType ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  {formatResult(result, analysisType)}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div className="space-y-2">
                    <p className="text-zinc-400">No analysis results yet</p>
                    <p className="text-zinc-500 text-sm">
                      Upload an image and select an analysis type to begin
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
