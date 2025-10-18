import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

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
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Join thousands of satisfied users who have simplified their visa application process.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 lg:p-8">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">"{testimonial.content}"</p>

                  {/* Author */}
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
