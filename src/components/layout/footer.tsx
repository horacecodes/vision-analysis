export function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8 backdrop-blur-xl bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-zinc-400 text-sm">Powered by Google Gemini AI</p>
          <div className="flex items-center gap-6 text-zinc-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
