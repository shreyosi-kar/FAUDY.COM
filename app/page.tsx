import { LandingHero } from "@/components/landing/hero"
import { LandingAbout } from "@/components/landing/about"
import { LandingFeatures } from "@/components/landing/features"
import { LandingStats } from "@/components/landing/stats"
import { LandingCTA } from "@/components/landing/cta"
import { LandingNavbar } from "@/components/landing/navbar"
import { AnimatedBackground } from "@/components/ui/animated-background"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <AnimatedBackground />
      <div className="relative z-10">
        <LandingNavbar />
        <main>
          <LandingHero />
          <LandingAbout />
          <LandingFeatures />
          <LandingStats />
          <LandingCTA />
        </main>
      </div>
    </div>
  )
}
