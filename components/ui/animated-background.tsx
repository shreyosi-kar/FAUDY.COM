"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isDark = theme === "dark"

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create blobs
    const blobs = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 200 + 100,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.2 + 0.1,
    }))

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      blobs.forEach((blob) => {
        // Move blob
        blob.x += blob.dx
        blob.y += blob.dy

        // Bounce off edges
        if (blob.x < 0 || blob.x > canvas.width) blob.dx *= -1
        if (blob.y < 0 || blob.y > canvas.height) blob.dy *= -1

        // Draw blob
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius)

        if (isDark) {
          gradient.addColorStop(0, `rgba(147, 51, 234, ${blob.opacity})`) // Purple
          gradient.addColorStop(1, `rgba(147, 51, 234, 0)`)
        } else {
          gradient.addColorStop(0, `rgba(249, 115, 22, ${blob.opacity})`) // Orange
          gradient.addColorStop(1, `rgba(249, 115, 22, 0)`)
        }

        ctx.fillStyle = gradient
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 -z-10"
    />
  )
}
