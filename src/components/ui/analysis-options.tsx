"use client"

import { Card } from "./card"
import { cn } from "@/lib/utils"
import {
  Instagram,
  FileText,
  Wand2,
  ImageIcon,
  CheckCircle,
} from "lucide-react"
import { AnalysisType } from "@/lib/prompts"

interface AnalysisOption {
  id: AnalysisType
  label: string
  icon: React.ReactNode
  description: string
}

const options: AnalysisOption[] = [
  {
    id: "instagram",
    label: "Instagram Caption",
    icon: <Instagram className="w-5 h-5" />,
    description: "Generate engaging captions for your Instagram posts",
  },
  {
    id: "detailed",
    label: "Detailed Analysis",
    icon: <FileText className="w-5 h-5" />,
    description: "Get a comprehensive analysis of your image",
  },
  {
    id: "midjourney",
    label: "Midjourney Prompt",
    icon: <Wand2 className="w-5 h-5" />,
    description: "Generate Midjourney prompts based on your image",
  },
  {
    id: "stable-diffusion",
    label: "Stable Diffusion",
    icon: <ImageIcon className="w-5 h-5" />,
    description: "Create Stable Diffusion prompts from your image",
  },
]

interface AnalysisOptionsProps {
  selected: AnalysisType | null
  onSelect: (type: AnalysisType) => void
  className?: string
}

export function AnalysisOptions({
  selected,
  onSelect,
  className,
}: AnalysisOptionsProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3", className)}>
      {options.map((option) => (
        <Card
          key={option.id}
          className={cn(
            "relative p-4 cursor-pointer transition-all duration-200",
            "backdrop-blur-xl bg-zinc-900/50 border-zinc-800 hover:border-zinc-700",
            selected === option.id &&
              "border-blue-500/50 ring-1 ring-blue-500/20 bg-blue-950/20",
          )}
          onClick={() => onSelect(option.id)}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "p-2 rounded-lg transition-colors",
                selected === option.id
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-zinc-800 text-zinc-400",
              )}
            >
              {option.icon}
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <h3 className="font-medium leading-none tracking-tight truncate">
                {option.label}
              </h3>
              <p className="text-sm text-zinc-400 line-clamp-2">
                {option.description}
              </p>
            </div>
            {selected === option.id && (
              <CheckCircle className="absolute top-4 right-4 w-4 h-4 text-blue-400" />
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
