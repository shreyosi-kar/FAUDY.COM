"use client"

import { motion } from "framer-motion"
import { Shield, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function FraudScoreCard() {
  const score = 92

  let status = "Excellent"
  let statusIcon = CheckCircle
  let statusColor = "text-green-500"
  let progressColor = "bg-green-500"

  if (score < 50) {
    status = "Critical"
    statusIcon = AlertCircle
    statusColor = "text-red-500"
    progressColor = "bg-red-500"
  } else if (score < 70) {
    status = "Warning"
    statusIcon = AlertTriangle
    statusColor = "text-yellow-500"
    progressColor = "bg-yellow-500"
  }

  const StatusIcon = statusIcon

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="relative flex h-36 w-36 items-center justify-center rounded-full border-8 border-muted"
        >
          <Shield className="h-16 w-16 text-primary" />
          <div className="absolute -top-2 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md">
            <StatusIcon className={cn("h-6 w-6", statusColor)} />
          </div>
        </motion.div>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold">{score}/100</h3>
        <p className={cn("text-sm font-medium", statusColor)}>{status}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span>Fraud Score</span>
          <span>{score}%</span>
        </div>
        <Progress value={score} className={cn("h-2", progressColor)} />
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h4 className="mb-2 text-sm font-medium">Recommendations</h4>
        <ul className="space-y-2 text-xs">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Enable two-factor authentication</span>
          </li>
          <li className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span>Update your password regularly</span>
          </li>
          <li className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span>Review recent login activity</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
