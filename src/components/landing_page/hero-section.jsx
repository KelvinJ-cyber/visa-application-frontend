import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import worldMap from '@/assets/world-map-with-airplane-routes-and-passport-travel.jpg'

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={worldMap} alt="Global travel background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-primary/80 to-slate-900/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 text-balance leading-tight tracking-tight">
              Apply for Your Visa Seamlessly <br className="hidden lg:block" /> Anytime, Anywhere
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-8 lg:mb-12 max-w-2xl mx-auto text-pretty font-medium">
              Fast, secure, and easy visa processing at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base lg:text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-full font-semibold"
                asChild
              >
                <Link to="/register">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base lg:text-lg px-8 py-6 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-full font-semibold"
                asChild
              >
                <Link to="/admin/login">Agent Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
    </section>
  )
}
