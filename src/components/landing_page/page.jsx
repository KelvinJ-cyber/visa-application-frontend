import { AboutSection } from "./about-section";
import { Header } from "./header";
import { HeroSection } from "./hero-section";
import '@/styles/globals2.css';
import { HowItWorksSection } from "./how-it-works";
import { FeaturesSection } from "./feauture-section";

export default function Page() {
  return (
    <div className="min-h-screen ">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <FeaturesSection />
      </main>
    </div>
  );
}
