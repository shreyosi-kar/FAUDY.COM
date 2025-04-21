"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function LandingCTA() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join the Fight Against Fraud</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Be part of the solution. Sign up today and help us create a safer digital world.
          </p>
          <div className="mt-8">
            <Link href="/signup">
              <Button size="lg" className="rounded-full px-8">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
