"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LandingNavbar } from "@/components/landing/navbar"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { Shield, Award, Users, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"

const timeline = [
  {
    year: "2018",
    title: "Company Founded",
    description: "FAUDY was established with a mission to revolutionize digital fraud prevention.",
  },
  {
    year: "2019",
    title: "First AI Model",
    description: "Launched our first AI-powered fraud detection algorithm with 85% accuracy.",
  },
  {
    year: "2020",
    title: "Blockchain Integration",
    description: "Integrated blockchain technology for immutable security logs and enhanced transparency.",
  },
  {
    year: "2021",
    title: "Enterprise Launch",
    description: "Released enterprise solution serving Fortune 500 companies across financial services.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Expanded operations to Europe and Asia with offices in London and Singapore.",
  },
  {
    year: "2023",
    title: "Consumer Platform",
    description: "Launched consumer-facing platform to protect individuals from digital fraud.",
  },
]

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We prioritize the security and privacy of our users above all else.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our technology and service.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of collaboration to solve complex security challenges.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "We continuously innovate to stay ahead of evolving fraud techniques.",
  },
]

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <AnimatedBackground />
      <div className="relative z-10">
        <LandingNavbar />
        <main className="container px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-5xl"
          >
            {/* Hero Section */}
            <div className="text-center mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
              >
                About FAUDY
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl"
              >
                Our mission is to create a safer digital world through innovative fraud prevention technology.
              </motion.p>
            </div>

            {/* Our Story */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                  <div className="space-y-4">
                    <p>
                      FAUDY was founded in 2018 by a team of cybersecurity experts and AI researchers with a shared
                      vision: to make digital fraud prevention accessible, transparent, and effective for everyone.
                    </p>
                    <p>
                      What began as a research project at MIT has evolved into a comprehensive platform that combines
                      cutting-edge AI with blockchain technology to detect, prevent, and report digital fraud in
                      real-time.
                    </p>
                    <p>
                      Today, FAUDY protects millions of users and hundreds of businesses worldwide, with a proven track
                      record of preventing over $2 billion in potential fraud losses.
                    </p>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-[300px] rounded-lg overflow-hidden neumorphism"
                >
                  <Image src="/placeholder.svg?height=600&width=800" alt="FAUDY team" fill className="object-cover" />
                </motion.div>
              </div>
            </motion.section>

            {/* Our Values */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full backdrop-blur-sm bg-background/80 border-primary/20">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                          <value.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Timeline */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-ml-0.5"></div>

                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div key={item.year} className="relative">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`flex md:items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                      >
                        <div className="ml-12 md:w-1/2 md:ml-0 md:px-8">
                          <div className="p-4 rounded-lg glassmorphism">
                            <div className="flex items-center">
                              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm mr-3">
                                {item.year}
                              </span>
                              <h3 className="text-lg font-bold">{item.title}</h3>
                            </div>
                            <p className="mt-2 text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <div className="absolute left-0 top-3 flex items-center justify-center md:left-1/2 md:-ml-3.5">
                          <div className="h-7 w-7 rounded-full border-4 border-background bg-primary"></div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Team */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    name: "Alex Johnson",
                    role: "CEO & Founder",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                  {
                    name: "Sarah Chen",
                    role: "CTO",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                  {
                    name: "Michael Rodriguez",
                    role: "Head of AI",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                  {
                    name: "Priya Patel",
                    role: "Blockchain Lead",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                ].map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden backdrop-blur-sm bg-background/80 border-primary/20">
                      <CardContent className="p-0">
                        <div className="relative h-64 w-full">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="text-xl font-bold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Achievements */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-8 text-center">Our Achievements</h2>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Shield className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">12k+</h3>
                      <p className="text-muted-foreground">Fraud Cases Prevented</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">500+</h3>
                      <p className="text-muted-foreground">Enterprise Clients</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">$2B+</h3>
                      <p className="text-muted-foreground">Fraud Losses Prevented</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* CTA */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Join the Fight Against Fraud?</h2>
              <p className="mx-auto mb-8 max-w-[600px] text-muted-foreground">
                Be part of our mission to create a safer digital world for everyone.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Get Started
                </Button>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="gap-2">
                    Contact Us
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.section>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
