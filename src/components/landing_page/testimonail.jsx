import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Business Traveler",
    content:
      "Global Visa Connect made my visa application process incredibly smooth. I was able to track everything in real-time and got my visa approved faster than expected!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Student",
    content:
      "As an international student, the platform helped me navigate the complex visa requirements with ease. The agent support was exceptional and very responsive.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Travel Agent",
    content:
      "I use this platform for all my clients. The agent portal is intuitive, and the document management system saves me hours of work. Highly recommended!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/40 relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-24 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 text-balance tracking-tight">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-medium">
              Join thousands of satisfied users who have simplified their visa application process.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="relative border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-background overflow-hidden animate-in fade-in slide-in-from-bottom group hover:-translate-y-1"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-4 right-4 text-primary/5 transition-colors duration-500 group-hover:text-primary/10">
                  <Quote className="h-24 w-24 rotate-3" />
                </div>
                
                <CardContent className="p-8 lg:p-10 relative z-10 flex flex-col h-full">
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-muted-foreground font-medium text-lg leading-relaxed mb-8 text-pretty">"{testimonial.content}"</p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50 mt-auto">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-lg tracking-tight">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
