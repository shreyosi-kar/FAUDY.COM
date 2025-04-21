"use client"

import { motion } from "framer-motion"
import { CheckCircle, AlertTriangle, Info, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    type: "success",
    title: "Login successful",
    description: "New login from your Chrome browser",
    time: "Just now",
    icon: CheckCircle,
  },
  {
    id: 2,
    type: "warning",
    title: "Suspicious login attempt",
    description: "Blocked login attempt from unknown device",
    time: "2 hours ago",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "info",
    title: "Security scan completed",
    description: "Weekly security scan completed successfully",
    time: "Yesterday",
    icon: Info,
  },
  {
    id: 4,
    type: "success",
    title: "Password updated",
    description: "Your account password was updated",
    time: "3 days ago",
    icon: Shield,
  },
  {
    id: 5,
    type: "info",
    title: "New device added",
    description: "iPhone 13 Pro was added to trusted devices",
    time: "1 week ago",
    icon: Info,
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex gap-4"
        >
          <div
            className={cn(
              "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full",
              activity.type === "success" && "bg-green-100 dark:bg-green-900",
              activity.type === "warning" && "bg-yellow-100 dark:bg-yellow-900",
              activity.type === "info" && "bg-blue-100 dark:bg-blue-900",
            )}
          >
            <activity.icon
              className={cn(
                "h-4 w-4",
                activity.type === "success" && "text-green-600 dark:text-green-400",
                activity.type === "warning" && "text-yellow-600 dark:text-yellow-400",
                activity.type === "info" && "text-blue-600 dark:text-blue-400",
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
