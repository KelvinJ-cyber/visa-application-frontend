import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import worldMap from '@/assets/world-map-with-airplane-routes-and-passport-travel.jpg'

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen  flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={worldMap} alt="G</div>lobal travel background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 text-balance leading-tight">
            Apply for Your Visa Seamlessly — Anytime, Anywhere
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 lg:mb-12 max-w-2xl mx-auto text-pretty">
            Fast, secure, and easy visa processing at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-base lg:text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
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
              className="w-full sm:w-auto text-base lg:text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white shadow-xl"
              asChild
            >
              <Link to="/admin/login">Agent Login</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
