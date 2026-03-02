import { Globe2 } from "lucide-react"
import img from '@/assets/diverse-people-traveling-with-luggage-at-modern-ai.jpg'

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decorative Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-[60%] -right-[10%] w-[30%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-sm">
                <Globe2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary tracking-wide uppercase">About Us</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground text-balance tracking-tight leading-[1.1]">
                Your Visa, <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Simplified.</span>
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium">
                  Global Visa Connect helps simplify global travel by providing a secure and user-friendly platform for
                  visa applications. Our mission is to streamline the process by allowing users to apply,
                  track, and manage easily online.
                </p>
                <p className="text-lg text-muted-foreground/80 leading-relaxed text-pretty">
                  Whether you're an individual applying for a visa or a certified agent assisting applicants, our platform
                  provides the tools and support you need for a seamless experience.
                </p>
              </div>
            </div>

            {/* Image section */}
            <div className="relative animate-in fade-in slide-in-from-right duration-1000 delay-150">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,_0,_0,_0.1)] hover:shadow-[0_20px_50px_rgba(0,_0,_0,_0.2)] transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 border rounded-3xl border-white/20 z-10 pointer-events-none" />
                <img src={img} alt="People traveling" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10" />
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full blur-[60px] -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
