import { UserPlus, FileText, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description: "Sign up in minutes with your email. Set up your secure profile to get started.",
    step: "01",
  },
  {
    icon: FileText,
    title: "Submit Your Application",
    description: "Fill out your visa application form and upload required documents securely.",
    step: "02",
  },
  {
    icon: TrendingUp,
    title: "Track Your Visa Status",
    description: "Monitor your application progress in real-time with email notifications.",
    step: "03",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-muted/50 ">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Get your visa in three simple steps. Our streamlined process makes it easy and efficient.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="relative border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 lg:p-8">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg font-bold text-primary-foreground">{step.step}</span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex p-4 bg-primary/10 rounded-xl">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
