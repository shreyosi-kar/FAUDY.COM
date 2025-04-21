"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const news = [
  {
    id: 1,
    title: "New Phishing Campaign Targets Banking Customers",
    source: "CyberSecurity News",
    time: "2 hours ago",
    url: "#",
  },
  {
    id: 2,
    title: "Critical Vulnerability Found in Popular Browser Extension",
    source: "Security Weekly",
    time: "5 hours ago",
    url: "#",
  },
  {
    id: 3,
    title: "Ransomware Attacks Increased by 40% in Q2 2023",
    source: "Threat Post",
    time: "Yesterday",
    url: "#",
  },
  {
    id: 4,
    title: "New AI Tool Helps Detect Deepfake Videos",
    source: "Tech Security Today",
    time: "2 days ago",
    url: "#",
  },
  {
    id: 5,
    title: "Government Issues Advisory on Zero-Day Vulnerability",
    source: "National Cybersecurity Center",
    time: "3 days ago",
    url: "#",
  },
]

export function CybersecurityNews() {
  const [tickerItems, setTickerItems] = useState(news)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const firstItem = tickerItems[0]
        setTickerItems([...tickerItems.slice(1), firstItem])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [tickerItems])

  return (
    <div className="space-y-4">
      <div ref={scrollRef} className="relative overflow-hidden rounded-lg border bg-card p-1">
        <ScrollArea className="h-12">
          <div className="flex items-center px-2">
            <span className="mr-2 rounded bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">LIVE</span>
            {tickerItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="whitespace-nowrap px-4 text-sm"
              >
                {item.title} <span className="text-muted-foreground">• {item.source}</span>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <ScrollArea className="h-[220px]">
        <div className="space-y-4">
          {news.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg border p-3"
            >
              <div className="flex justify-between">
                <h3 className="font-medium">{item.title}</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Open link</span>
                  </a>
                </Button>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.source}</span>
                <span>{item.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
