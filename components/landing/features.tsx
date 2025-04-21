"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Shield, Bell } from "lucide-react"

const features = [
  {
    title: "AI Chat",
    description:
      "Our advanced AI assistant helps you identify potential fraud and provides real-time guidance on suspicious activities.",
    icon: Bot,
  },
  {
    title: "Blockchain Log",
    description:
      "Every transaction and alert is securely recorded on the blockchain, ensuring complete transparency and immutability.",
    icon: Shield,
  },
  {
    title: "Real-Time Alerts",
    description:
      "Receive instant notifications about suspicious activities related to your accounts and digital identity.",
    icon: Bell,
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Discover how FAUDY helps you stay protected in the digital world.
          </p>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full backdrop-blur-sm bg-background/80 border-primary/20">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
