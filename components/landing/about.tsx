"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    quote: "Protecting digital identities is our mission.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    quote: "AI and blockchain are the future of security.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of AI",
    quote: "We're building the smartest fraud detection system.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Priya Patel",
    role: "Blockchain Lead",
    quote: "Transparency and security go hand in hand.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function LandingAbout() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Us</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Meet the team behind FAUDY's innovative fraud prevention technology.
          </p>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden backdrop-blur-sm bg-background/80 border-primary/20">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                  <p className="italic text-sm">"{member.quote}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
