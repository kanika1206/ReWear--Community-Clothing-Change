import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 6a2 2 0 0 0-2 2v3c0 1.2.6 2.2 1.6 2.8l2.4 1.3-4.2 4.2a2 2 0 1 0 2.8 2.8l5.2-5.2a2 2 0 0 0-.4-3.2l-3.4-1.9V8a2 2 0 0 0-2-2zm-2 22L4 44.5c-.8.5-1 1.5-.6 2.3a2 2 0 0 0 2.6.8L32 34l26 13.6a2 2 0 0 0 2.6-.8c.4-.8.2-1.8-.6-2.3L34 28a2 2 0 0 0-2 0z"/>
              </svg>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ReWear
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Circular fashion for a sustainable future. Quality pre-loved clothing with purpose.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 pt-4">
            <div>
              <Link 
                href="/about" 
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                About Us
              </Link>
            </div>
            <div>
              <Link 
                href="/faq" 
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                FAQ
              </Link>
            </div>
            <div>
              <Link 
                href="/help-center" 
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Help Center
              </Link>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 w-full max-w-xs">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ReWear. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
