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
    <section className="py-16 lg:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Everything you need for a smooth visa application experience, all in one place.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div className="mb-4 inline-flex">
                    <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
