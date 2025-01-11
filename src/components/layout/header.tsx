import { Github, Twitter } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-zinc-800 backdrop-blur-xl bg-black/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 font-semibold">VA</span>
            </div>
            <span className="font-medium">Vision Analysis</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/horacecodes/vision-analysis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/horacecodes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
