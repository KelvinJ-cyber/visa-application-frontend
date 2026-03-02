import { Activity, Shield, Bell, Headphones } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Activity,
    title: "Real-Time Tracking",
    description: "Monitor your visa application status at every stage with live updates.",
  },
  {
    icon: Shield,
    title: "Secure Document Upload",
    description: "Upload your documents with confidence using bank-level encryption.",
  },
  {
    icon: Bell,
    title: "Email Notifications",
    description: "Stay informed with instant email alerts for every application update.",
  },
  {
    icon: Headphones,
    title: "Agent Support",
    description: "Get expert assistance from certified agents throughout your journey.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-24 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 text-balance tracking-tight">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-medium">
              Everything you need for a smooth visa application experience, all in one place.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group animate-in fade-in slide-in-from-bottom hover:-translate-y-1.5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center sm:text-left">
                  {/* Icon */}
                  <div className="mb-6 inline-flex">
                    <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(8,112,184,0.3)] transition-all duration-500">
                      <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
