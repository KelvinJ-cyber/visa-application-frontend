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
    <section id="how-it-works" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-24 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 text-balance tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-medium">
              Get your visa in three simple steps. Our streamlined process makes it easy and efficient.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="relative grid md:grid-cols-3 gap-12 lg:gap-8">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 -z-10" />

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Card className="border-0 shadow-none bg-transparent h-full">
                  <CardContent className="p-0 flex flex-col items-center text-center">
                    {/* Icon Container with Step Number */}
                    <div className="relative mb-8">
                      <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_8px_30px_rgba(8,112,184,0.12)] transition-all duration-500 group-hover:-translate-y-2 border border-muted/50">
                        <step.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-background">
                        <span className="text-sm font-bold text-primary-foreground">{step.step}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg font-medium">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
