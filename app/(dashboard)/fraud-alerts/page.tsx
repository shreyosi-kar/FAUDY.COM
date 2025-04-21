"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  Shield,
  Bell,
  Filter,
  ChevronDown,
  Search,
  CheckCircle,
  Clock,
  Zap,
  Lock,
  CreditCard,
  Mail,
  Smartphone,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { FraudAlertChart } from "@/components/dashboard/fraud-alert-chart"

type AlertSeverity = "critical" | "high" | "medium" | "low"
type AlertStatus = "active" | "resolved" | "investigating"
type AlertCategory = "account" | "payment" | "identity" | "device" | "phishing"

interface FraudAlert {
  id: string
  title: string
  description: string
  severity: AlertSeverity
  status: AlertStatus
  category: AlertCategory
  timestamp: string
  source: string
  ipAddress?: string
  location?: string
  device?: string
  riskScore: number
}

const getCategoryIcon = (category: AlertCategory) => {
  switch (category) {
    case "account":
      return User
    case "payment":
      return CreditCard
    case "identity":
      return Lock
    case "device":
      return Smartphone
    case "phishing":
      return Mail
    default:
      return AlertTriangle
  }
}

const getSeverityColor = (severity: AlertSeverity) => {
  switch (severity) {
    case "critical":
      return "text-red-500"
    case "high":
      return "text-orange-500"
    case "medium":
      return "text-yellow-500"
    case "low":
      return "text-green-500"
    default:
      return "text-muted-foreground"
  }
}

const getStatusColor = (status: AlertStatus) => {
  switch (status) {
    case "active":
      return "bg-red-500"
    case "investigating":
      return "bg-yellow-500"
    case "resolved":
      return "bg-green-500"
    default:
      return "bg-muted"
  }
}

const alerts: FraudAlert[] = [
  {
    id: "1",
    title: "Suspicious Login Attempt",
    description: "Multiple failed login attempts detected from an unknown location",
    severity: "critical",
    status: "active",
    category: "account",
    timestamp: "2023-06-15T14:32:21Z",
    source: "Login System",
    ipAddress: "185.176.43.89",
    location: "Moscow, Russia",
    device: "Unknown Device",
    riskScore: 92,
  },
  {
    id: "2",
    title: "Unusual Transaction Pattern",
    description: "Multiple small transactions followed by a large withdrawal",
    severity: "high",
    status: "investigating",
    category: "payment",
    timestamp: "2023-06-14T09:15:43Z",
    source: "Transaction Monitoring",
    riskScore: 78,
  },
  {
    id: "3",
    title: "Potential Identity Theft",
    description: "Your personal information was found on a known dark web marketplace",
    severity: "high",
    status: "active",
    category: "identity",
    timestamp: "2023-06-13T18:45:12Z",
    source: "Dark Web Scanner",
    riskScore: 85,
  },
  {
    id: "4",
    title: "New Device Login",
    description: "First-time login detected from a new device",
    severity: "medium",
    status: "resolved",
    category: "device",
    timestamp: "2023-06-12T11:22:33Z",
    source: "Device Tracker",
    device: "iPhone 13 Pro",
    location: "New York, USA",
    riskScore: 45,
  },
  {
    id: "5",
    title: "Phishing Email Detected",
    description: "A suspicious email claiming to be from your bank was blocked",
    severity: "medium",
    status: "resolved",
    category: "phishing",
    timestamp: "2023-06-11T07:55:19Z",
    source: "Email Security",
    riskScore: 60,
  },
  {
    id: "6",
    title: "Password Reset Attempt",
    description: "Someone attempted to reset your password",
    severity: "high",
    status: "active",
    category: "account",
    timestamp: "2023-06-10T15:30:45Z",
    source: "Account Security",
    ipAddress: "103.74.19.104",
    location: "Beijing, China",
    riskScore: 82,
  },
  {
    id: "7",
    title: "Credit Card Data Breach",
    description: "Your credit card information may have been exposed in a recent data breach",
    severity: "critical",
    status: "investigating",
    category: "payment",
    timestamp: "2023-06-09T12:10:33Z",
    source: "Breach Monitor",
    riskScore: 95,
  },
  {
    id: "8",
    title: "Suspicious App Installation",
    description: "A potentially malicious app was installed on your device",
    severity: "medium",
    status: "active",
    category: "device",
    timestamp: "2023-06-08T23:42:11Z",
    source: "Device Security",
    device: "Android Phone",
    riskScore: 65,
  },
]

export default function FraudAlertsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [statusFilter, setStatusFilter] = useState<AlertStatus | "all">("all")

  const filteredAlerts = alerts.filter((alert) => {
    // Filter by search query
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab (category)
    const matchesCategory = activeTab === "all" || alert.category === activeTab

    // Filter by status
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fraud Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage potential security threats</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Status: {statusFilter === "all" ? "All" : statusFilter}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("investigating")}>Investigating</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("resolved")}>Resolved</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-2">
            <Bell className="h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search alerts by title, description or source..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="identity">Identity</TabsTrigger>
          <TabsTrigger value="device">Device</TabsTrigger>
          <TabsTrigger value="phishing">Phishing</TabsTrigger>
        </TabsList>

        <div className="mt-4 grid flex-1 gap-4 md:grid-cols-2">
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle>Alert Feed</CardTitle>
              <CardDescription>
                {filteredAlerts.length} {filteredAlerts.length === 1 ? "alert" : "alerts"} found
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[calc(100vh-22rem)]">
                <div className="space-y-2 p-4">
                  <AnimatePresence>
                    {filteredAlerts.map((alert, index) => {
                      const CategoryIcon = getCategoryIcon(alert.category)
                      return (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="relative"
                        >
                          <motion.div
                            className={cn(
                              "absolute top-0 left-0 h-full w-1 rounded-l-md",
                              getStatusColor(alert.status),
                            )}
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
                          />
                          <Button
                            variant="ghost"
                            className={cn(
                              "h-auto w-full justify-start rounded-l-none p-3 text-left",
                              selectedAlert?.id === alert.id && "bg-accent",
                            )}
                            onClick={() => setSelectedAlert(alert)}
                          >
                            <div className="flex w-full flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={cn(
                                      "flex h-8 w-8 items-center justify-center rounded-full",
                                      alert.severity === "critical" && "bg-red-100 dark:bg-red-900",
                                      alert.severity === "high" && "bg-orange-100 dark:bg-orange-900",
                                      alert.severity === "medium" && "bg-yellow-100 dark:bg-yellow-900",
                                      alert.severity === "low" && "bg-green-100 dark:bg-green-900",
                                    )}
                                  >
                                    <CategoryIcon className={cn("h-4 w-4", getSeverityColor(alert.severity))} />
                                  </div>
                                  <span className="font-medium">{alert.title}</span>
                                </div>
                                <Badge
                                  variant={
                                    alert.status === "active"
                                      ? "destructive"
                                      : alert.status === "investigating"
                                        ? "outline"
                                        : "default"
                                  }
                                  className="ml-auto"
                                >
                                  {alert.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{alert.description}</p>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(alert.timestamp).toLocaleString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>Risk Score:</span>
                                  <span
                                    className={cn(
                                      alert.riskScore > 80
                                        ? "text-red-500"
                                        : alert.riskScore > 60
                                          ? "text-orange-500"
                                          : alert.riskScore > 40
                                            ? "text-yellow-500"
                                            : "text-green-500",
                                    )}
                                  >
                                    {alert.riskScore}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Button>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>

                  {filteredAlerts.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-center"
                    >
                      <CheckCircle className="h-10 w-10 text-muted-foreground/50" />
                      <h3 className="text-lg font-medium">No alerts found</h3>
                      <p className="text-sm text-muted-foreground">No alerts match your current filters</p>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle>Alert Details</CardTitle>
                <CardDescription>Detailed information about the selected alert</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedAlert ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{selectedAlert.title}</h3>
                      <Badge
                        variant={
                          selectedAlert.status === "active"
                            ? "destructive"
                            : selectedAlert.status === "investigating"
                              ? "outline"
                              : "default"
                        }
                      >
                        {selectedAlert.status}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                        <p>{selectedAlert.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(selectedAlert.category)({ className: "h-4 w-4 text-primary" })}
                            <span className="capitalize">{selectedAlert.category}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Severity</h4>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full",
                                selectedAlert.severity === "critical" && "bg-red-500",
                                selectedAlert.severity === "high" && "bg-orange-500",
                                selectedAlert.severity === "medium" && "bg-yellow-500",
                                selectedAlert.severity === "low" && "bg-green-500",
                              )}
                            />
                            <span className="capitalize">{selectedAlert.severity}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Source</h4>
                          <p>{selectedAlert.source}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Timestamp</h4>
                          <p>{new Date(selectedAlert.timestamp).toLocaleString()}</p>
                        </div>
                      </div>

                      {(selectedAlert.ipAddress || selectedAlert.location) && (
                        <div className="grid grid-cols-2 gap-4">
                          {selectedAlert.ipAddress && (
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">IP Address</h4>
                              <p>{selectedAlert.ipAddress}</p>
                            </div>
                          )}
                          {selectedAlert.location && (
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                              <p>{selectedAlert.location}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedAlert.device && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Device</h4>
                          <p>{selectedAlert.device}</p>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Risk Score</h4>
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Score</span>
                            <span
                              className={cn(
                                selectedAlert.riskScore > 80
                                  ? "text-red-500"
                                  : selectedAlert.riskScore > 60
                                    ? "text-orange-500"
                                    : selectedAlert.riskScore > 40
                                      ? "text-yellow-500"
                                      : "text-green-500",
                              )}
                            >
                              {selectedAlert.riskScore}/100
                            </span>
                          </div>
                          <Progress
                            value={selectedAlert.riskScore}
                            className={cn(
                              "h-2",
                              selectedAlert.riskScore > 80
                                ? "bg-red-500"
                                : selectedAlert.riskScore > 60
                                  ? "bg-orange-500"
                                  : selectedAlert.riskScore > 40
                                    ? "bg-yellow-500"
                                    : "bg-green-500",
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {selectedAlert.status !== "resolved" && (
                        <Button className="flex-1 gap-2">
                          <Shield className="h-4 w-4" />
                          Resolve Alert
                        </Button>
                      )}
                      <Button variant="outline" className="flex-1 gap-2">
                        <Zap className="h-4 w-4" />
                        Run Investigation
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-[400px] flex-col items-center justify-center gap-4 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">No Alert Selected</h3>
                    <p className="text-muted-foreground">Select an alert from the list to view its details</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Alert Trends</CardTitle>
                <CardDescription>Historical view of alerts by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <FraudAlertChart />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
