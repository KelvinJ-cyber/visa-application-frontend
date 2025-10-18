import { Globe, Mail, Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"


export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="bg-primary rounded-lg p-2">
                  <Globe className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg text-foreground">Travel sure</span>
              </Link>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Simplifying global travel with secure and user-friendly visa application services. Your trusted partner
                for seamless visa processing.
              </p>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" asChild>
                  <a href="https://github.com/KelvinJ-cyber" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="icon" variant="outline" asChild>
                  <a href="https://x.com/KelvinAPIs" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="icon" variant="outline" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="icon" variant="outline" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#home" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Contact Us</h3>
              <div className="space-y-3">
                <a
                  href="mailto:support@globalvisaconnect.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">support@travelsure.com</span>
                </a>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Subscribe to our newsletter</p>
                  <div className="flex gap-2">
                    <Input type="email" placeholder="Your email" className="text-sm" />
                    <Button size="sm">Subscribe</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                © 2025 Travel sure. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
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
