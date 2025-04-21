"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Filter, ChevronDown, Search, CheckCircle, X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type NotificationType = "security" | "system" | "account" | "payment"
type NotificationPriority = "high" | "medium" | "low"

interface Notification {
  id: string
  title: string
  description: string
  type: NotificationType
  priority: NotificationPriority
  timestamp: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Security Alert: New Login",
    description: "A new login was detected from New York, USA using Chrome on Windows.",
    type: "security",
    priority: "high",
    timestamp: "2023-06-15T14:32:21Z",
    read: false,
  },
  {
    id: "2",
    title: "System Update Complete",
    description: "The system has been updated to version 2.4.0 with new security features.",
    type: "system",
    priority: "medium",
    timestamp: "2023-06-14T09:15:43Z",
    read: false,
  },
  {
    id: "3",
    title: "Account Verification Required",
    description: "Please verify your email address to continue using all features.",
    type: "account",
    priority: "high",
    timestamp: "2023-06-13T18:45:12Z",
    read: true,
  },
  {
    id: "4",
    title: "Payment Method Expiring",
    description: "Your credit card ending in 4242 will expire next month.",
    type: "payment",
    priority: "medium",
    timestamp: "2023-06-12T11:22:33Z",
    read: false,
  },
  {
    id: "5",
    title: "Security Scan Complete",
    description: "Weekly security scan completed with no issues found.",
    type: "security",
    priority: "low",
    timestamp: "2023-06-11T07:55:19Z",
    read: true,
  },
  {
    id: "6",
    title: "System Maintenance Scheduled",
    description: "System maintenance scheduled for June 20, 2023 at 02:00 UTC.",
    type: "system",
    priority: "medium",
    timestamp: "2023-06-10T15:30:45Z",
    read: true,
  },
  {
    id: "7",
    title: "Account Settings Updated",
    description: "Your account settings were updated from a new device.",
    type: "account",
    priority: "high",
    timestamp: "2023-06-09T12:10:33Z",
    read: false,
  },
  {
    id: "8",
    title: "Payment Successful",
    description: "Your monthly subscription payment was processed successfully.",
    type: "payment",
    priority: "low",
    timestamp: "2023-06-08T23:42:11Z",
    read: true,
  },
]

const notificationSettings = [
  {
    id: "email-security",
    label: "Security Alerts",
    description: "Receive emails about security-related events",
    defaultChecked: true,
    category: "email",
  },
  {
    id: "email-system",
    label: "System Updates",
    description: "Receive emails about system updates and maintenance",
    defaultChecked: true,
    category: "email",
  },
  {
    id: "email-account",
    label: "Account Notifications",
    description: "Receive emails about your account activity",
    defaultChecked: true,
    category: "email",
  },
  {
    id: "email-payment",
    label: "Payment Notifications",
    description: "Receive emails about payments and billing",
    defaultChecked: true,
    category: "email",
  },
  {
    id: "push-security",
    label: "Security Alerts",
    description: "Receive push notifications about security-related events",
    defaultChecked: true,
    category: "push",
  },
  {
    id: "push-system",
    label: "System Updates",
    description: "Receive push notifications about system updates and maintenance",
    defaultChecked: false,
    category: "push",
  },
  {
    id: "push-account",
    label: "Account Notifications",
    description: "Receive push notifications about your account activity",
    defaultChecked: true,
    category: "push",
  },
  {
    id: "push-payment",
    label: "Payment Notifications",
    description: "Receive push notifications about payments and billing",
    defaultChecked: true,
    category: "push",
  },
]

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [readFilter, setReadFilter] = useState<"all" | "read" | "unread">("all")
  const [userNotifications, setUserNotifications] = useState<Notification[]>(notifications)

  const handleMarkAsRead = (id: string) => {
    setUserNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleMarkAllAsRead = () => {
    setUserNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const handleClearNotification = (id: string) => {
    setUserNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const filteredNotifications = userNotifications.filter((notification) => {
    // Filter by search query
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab (type)
    const matchesType = activeTab === "all" || notification.type === activeTab

    // Filter by read status
    const matchesReadStatus = readFilter === "all" || (readFilter === "read" ? notification.read : !notification.read)

    return matchesSearch && matchesType && matchesReadStatus
  })

  const unreadCount = userNotifications.filter((notification) => !notification.read).length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
          <p className="text-muted-foreground">Manage your notification preferences and view recent alerts</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {readFilter === "all" ? "All" : readFilter === "read" ? "Read" : "Unread"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setReadFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setReadFilter("read")}>Read</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setReadFilter("unread")}>Unread</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleMarkAllAsRead} className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications" className="relative">
            Notifications
            {unreadCount > 0 && <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
          </Tabs>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                {filteredNotifications.length} {filteredNotifications.length === 1 ? "notification" : "notifications"}{" "}
                found
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-1 p-1">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={cn(
                          "flex items-start gap-4 rounded-lg p-3 transition-colors",
                          notification.read ? "bg-background" : "bg-muted",
                        )}
                      >
                        <div
                          className={cn(
                            "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full",
                            notification.type === "security" && "bg-red-100 dark:bg-red-900",
                            notification.type === "system" && "bg-blue-100 dark:bg-blue-900",
                            notification.type === "account" && "bg-yellow-100 dark:bg-yellow-900",
                            notification.type === "payment" && "bg-green-100 dark:bg-green-900",
                          )}
                        >
                          <Bell
                            className={cn(
                              "h-4 w-4",
                              notification.type === "security" && "text-red-600 dark:text-red-400",
                              notification.type === "system" && "text-blue-600 dark:text-blue-400",
                              notification.type === "account" && "text-yellow-600 dark:text-yellow-400",
                              notification.type === "payment" && "text-green-600 dark:text-green-400",
                            )}
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{notification.title}</p>
                            <Badge
                              variant={
                                notification.priority === "high"
                                  ? "destructive"
                                  : notification.priority === "medium"
                                    ? "outline"
                                    : "default"
                              }
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{new Date(notification.timestamp).toLocaleString()}</span>
                            <div className="flex gap-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-xs"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Mark as read
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                                onClick={() => handleClearNotification(notification.id)}
                              >
                                <X className="mr-1 h-3 w-3" />
                                Clear
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Bell className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">No notifications found</h3>
                      <p className="mt-2 text-sm text-muted-foreground">No notifications match your current filters</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Manage Email Settings
                  </Button>
                </div>
                <div className="space-y-4">
                  {notificationSettings
                    .filter((setting) => setting.category === "email")
                    .map((setting) => (
                      <div key={setting.id} className="flex items-start space-x-4">
                        <Switch id={setting.id} defaultChecked={setting.defaultChecked} />
                        <div className="space-y-1">
                          <label
                            htmlFor={setting.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {setting.label}
                          </label>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Push Notifications</h3>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Manage Push Settings
                  </Button>
                </div>
                <div className="space-y-4">
                  {notificationSettings
                    .filter((setting) => setting.category === "push")
                    .map((setting) => (
                      <div key={setting.id} className="flex items-start space-x-4">
                        <Switch id={setting.id} defaultChecked={setting.defaultChecked} />
                        <div className="space-y-1">
                          <label
                            htmlFor={setting.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {setting.label}
                          </label>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Display</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Switch id="show-preview" defaultChecked />
                    <div className="space-y-1">
                      <label
                        htmlFor="show-preview"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show Notification Preview
                      </label>
                      <p className="text-sm text-muted-foreground">Show notification content on your lock screen</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Switch id="sound-enabled" defaultChecked />
                    <div className="space-y-1">
                      <label
                        htmlFor="sound-enabled"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Notification Sounds
                      </label>
                      <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
