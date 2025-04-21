"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Send, User, AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI fraud prevention assistant. How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
]

const suggestions = [
  "What are the latest phishing techniques?",
  "How can I protect my credit card information?",
  "I received a suspicious email, what should I do?",
  "How do I report a potential fraud?",
]

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("phishing")) {
        response =
          "Phishing attacks are becoming more sophisticated. Always verify the sender's email address, don't click on suspicious links, and never share personal information via email. Enable two-factor authentication for all your important accounts."
      } else if (input.toLowerCase().includes("credit card")) {
        response =
          "To protect your credit card information, regularly monitor your statements, use virtual cards for online purchases, enable transaction alerts, and only use secure websites (look for HTTPS). Consider freezing your credit when not actively applying for new credit."
      } else if (input.toLowerCase().includes("suspicious") || input.toLowerCase().includes("email")) {
        response =
          "If you received a suspicious email, don't click any links or download attachments. Check the sender's email address carefully, look for spelling/grammar errors, and hover over links to see the actual URL. You can report it to your IT department or forward it to your email provider's phishing report address."
      } else if (input.toLowerCase().includes("report")) {
        response =
          "To report fraud, you can use our 'Report Fraud' feature in the dashboard. Provide as much detail as possible including screenshots, emails, or transaction details. Our team will investigate and respond within 24 hours."
      } else {
        response =
          "Thank you for your question. Our AI fraud prevention system is analyzing the best response for you. In the meantime, I recommend enabling two-factor authentication for all your accounts and regularly monitoring your financial statements for unauthorized transactions."
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Chat Assistant</h1>
          <p className="text-muted-foreground">Ask questions about fraud prevention and security</p>
        </div>
        <Button variant="outline" className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          Report Fraud
        </Button>
      </div>

      <Card className="flex flex-1 flex-col">
        <CardHeader className="border-b p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>FAUDY AI Assistant</CardTitle>
              <CardDescription>Powered by advanced fraud detection AI</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea ref={scrollAreaRef} className="h-full">
            <div className="flex flex-col gap-4 p-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex w-max max-w-[80%] flex-col gap-2 rounded-lg p-4",
                      message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full",
                          message.role === "user" ? "bg-primary-foreground/20" : "bg-background",
                        )}
                      >
                        {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <span className="text-xs font-medium">{message.role === "user" ? "You" : "FAUDY AI"}</span>
                      <span className="text-xs opacity-50">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="text-sm">{message.content}</div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg bg-muted p-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background">
                        <Bot className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-medium">FAUDY AI</span>
                      <Loader2 className="h-3 w-3 animate-spin" />
                    </div>
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                      <span
                        className="h-2 w-2 animate-pulse rounded-full bg-primary"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="h-2 w-2 animate-pulse rounded-full bg-primary"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          {messages.length <= 1 && (
            <div className="mb-4 grid w-full grid-cols-2 gap-2">
              {suggestions.map((suggestion, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
          <div className="flex w-full items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
