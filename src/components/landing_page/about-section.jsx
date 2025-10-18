import { Globe2 } from "lucide-react"
import img from '@/assets/diverse-people-traveling-with-luggage-at-modern-ai.jpg'

export function AboutSection() {
  return (
    <section id="about" className="py-16  lg:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Globe2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">About Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                Your Visa, Simplified.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Global Visa Connect helps simplify global travel by providing a secure and user-friendly platform for
                visa applications. Our mission is to streamline the visa application process by allowing users to apply,
                track, and manage their applications easily online.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Whether you're an individual applying for a visa or a certified agent assisting applicants, our platform
                provides the tools and support you need for a seamless experience.
              </p>
            </div>

            {/* Image */}
            <div className="relative animate-in fade-in slide-in-from-right duration-700">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={img} alt="People traveling" className="w-full h-auto" />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
