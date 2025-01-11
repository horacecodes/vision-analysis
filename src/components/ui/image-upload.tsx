"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { Card } from "./card"
import { ImageIcon, Upload } from "lucide-react"

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  className?: string
}

export function ImageUpload({ onImageSelect, className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
        onImageSelect(file)
      }
    },
    [onImageSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
  })

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative transition-all duration-200 cursor-pointer overflow-hidden",
        isDragActive && "ring-2 ring-blue-500/50 border-blue-500/50",
        className,
      )}
    >
      <input {...getInputProps()} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center min-h-[300px] gap-4 p-8">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-[400px] rounded-lg object-contain"
            />
            <p className="text-sm text-zinc-400">
              Click or drag to choose a different image
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-zinc-800/80 backdrop-blur-sm">
              <ImageIcon className="w-8 h-8 text-zinc-400" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center max-w-[280px]">
              <p className="text-sm font-medium text-zinc-300">
                {isDragActive ? (
                  "Drop your image here"
                ) : (
                  <>
                    <span className="text-blue-400">Click to upload</span>
                    {" or drag and drop"}
                  </>
                )}
              </p>
              <p className="text-xs text-zinc-400">
                Supports PNG, JPG, WEBP up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}