import { Globe, Mail, Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6 group w-fit">
                <div className="bg-primary/20 rounded-xl p-2.5 transition-transform group-hover:scale-105 group-hover:bg-primary text-primary group-hover:text-white">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="font-bold text-2xl text-white tracking-tight">Travel Sure</span>
              </Link>
              <p className="text-slate-400 mb-8 leading-relaxed max-w-sm text-lg">
                Simplifying global travel with secure and user-friendly visa application services. Your trusted partner
                for seamless visa processing.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/KelvinJ-cyber" target="_blank" rel="noopener noreferrer" aria-label="Github" className="h-10 w-10 rounded-full bg-slate-900/80 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 ring-1 ring-white/5 hover:ring-primary/50 text-slate-400">
                  <Github className="h-4 w-4" />
                </a>
                <a href="https://x.com/KelvinAPIs" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="h-10 w-10 rounded-full bg-slate-900/80 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 ring-1 ring-white/5 hover:ring-primary/50 text-slate-400">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-10 w-10 rounded-full bg-slate-900/80 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 ring-1 ring-white/5 hover:ring-primary/50 text-slate-400">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-10 w-10 rounded-full bg-slate-900/80 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 ring-1 ring-white/5 hover:ring-primary/50 text-slate-400">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-white mb-6 text-lg tracking-tight">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#home" className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 font-medium">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 font-medium">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 font-medium">
                    How It Works
                  </a>
                </li>
                <li>
                  <Link to="/login" className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 font-medium">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-white mb-6 text-lg tracking-tight">Contact Us</h3>
              <div className="space-y-4">
                <a
                  href="mailto:support@travelsure.com"
                  className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors ring-1 ring-white/5">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-medium">support@travelsure.com</span>
                </a>
                <div className="pt-6">
                  <p className="font-medium text-white mb-4">Subscribe to our newsletter</p>
                  <div className="flex gap-2 relative">
                    <Input type="email" placeholder="Your email" className="bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-primary rounded-full pl-4 pr-32 h-12" />
                    <Button className="absolute right-1 top-1 bottom-1 rounded-full px-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-10">Subscribe</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-900/80 relative">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <p className="text-slate-500 font-medium text-center sm:text-left text-sm">
                © {new Date().getFullYear()} Travel Sure. All rights reserved.
              </p>
              <div className="flex gap-8">
                <Link to="/privacy" className="font-medium text-slate-500 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="font-medium text-slate-500 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
