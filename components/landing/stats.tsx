"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    value: "12k+",
    label: "Fraud Cases Prevented",
  },
  {
    value: "99%",
    label: "Detection Accuracy",
  },
  {
    value: "24/7",
    label: "Monitoring & Protection",
  },
  {
    value: "500+",
    label: "Enterprise Clients",
  },
]

export function LandingStats() {
  return (
    <section id="stats" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Impact</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            See the difference FAUDY is making in the fight against digital fraud.
          </p>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center backdrop-blur-sm bg-background/80 border-primary/20">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
