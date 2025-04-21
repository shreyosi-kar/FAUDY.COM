"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Database,
  Download,
  Upload,
  Trash2,
  Lock,
  FileText,
  Filter,
  ChevronDown,
  Search,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { UserDataChart } from "@/components/dashboard/user-data-chart"

type DataCategory = "personal" | "financial" | "security" | "preferences" | "activity"
type DataSensitivity = "high" | "medium" | "low"

interface UserDataItem {
  id: string
  name: string
  description: string
  category: DataCategory
  sensitivity: DataSensitivity
  size: string
  lastUpdated: string
  encrypted: boolean
}

const userData: UserDataItem[] = [
  {
    id: "1",
    name: "Personal Information",
    description: "Name, address, contact details, and other personal identifiers",
    category: "personal",
    sensitivity: "high",
    size: "2.4 MB",
    lastUpdated: "2023-06-15T14:32:21Z",
    encrypted: true,
  },
  {
    id: "2",
    name: "Financial Records",
    description: "Bank account details, transaction history, and payment methods",
    category: "financial",
    sensitivity: "high",
    size: "8.7 MB",
    lastUpdated: "2023-06-14T09:15:43Z",
    encrypted: true,
  },
  {
    id: "3",
    name: "Security Logs",
    description: "Login history, security events, and authentication records",
    category: "security",
    sensitivity: "medium",
    size: "15.2 MB",
    lastUpdated: "2023-06-13T18:45:12Z",
    encrypted: true,
  },
  {
    id: "4",
    name: "User Preferences",
    description: "App settings, notification preferences, and UI customizations",
    category: "preferences",
    sensitivity: "low",
    size: "0.8 MB",
    lastUpdated: "2023-06-12T11:22:33Z",
    encrypted: false,
  },
  {
    id: "5",
    name: "Activity History",
    description: "App usage patterns, feature interactions, and session data",
    category: "activity",
    sensitivity: "medium",
    size: "23.5 MB",
    lastUpdated: "2023-06-11T07:55:19Z",
    encrypted: true,
  },
  {
    id: "6",
    name: "Device Information",
    description: "Connected devices, hardware identifiers, and system information",
    category: "security",
    sensitivity: "medium",
    size: "1.3 MB",
    lastUpdated: "2023-06-10T15:30:45Z",
    encrypted: true,
  },
  {
    id: "7",
    name: "Communication History",
    description: "Support tickets, in-app messages, and notification history",
    category: "activity",
    sensitivity: "low",
    size: "5.6 MB",
    lastUpdated: "2023-06-09T12:10:33Z",
    encrypted: false,
  },
  {
    id: "8",
    name: "Payment History",
    description: "Subscription details, billing records, and invoice history",
    category: "financial",
    sensitivity: "high",
    size: "3.2 MB",
    lastUpdated: "2023-06-08T23:42:11Z",
    encrypted: true,
  },
]

const getSensitivityColor = (sensitivity: DataSensitivity) => {
  switch (sensitivity) {
    case "high":
      return "text-red-500"
    case "medium":
      return "text-yellow-500"
    case "low":
      return "text-green-500"
    default:
      return "text-muted-foreground"
  }
}

export default function UserDataPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedItem, setSelectedItem] = useState<UserDataItem | null>(null)
  const [sensitivityFilter, setSensitivityFilter] = useState<DataSensitivity | "all">("all")

  const totalDataSize = userData.reduce((total, item) => {
    const sizeInMB = Number.parseFloat(item.size.replace(" MB", ""))
    return total + sizeInMB
  }, 0)

  const encryptedDataSize = userData
    .filter((item) => item.encrypted)
    .reduce((total, item) => {
      const sizeInMB = Number.parseFloat(item.size.replace(" MB", ""))
      return total + sizeInMB
    }, 0)

  const encryptionPercentage = Math.round((encryptedDataSize / totalDataSize) * 100)

  const filteredData = userData.filter((item) => {
    // Filter by search query
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab (category)
    const matchesCategory = activeTab === "all" || item.category === activeTab

    // Filter by sensitivity
    const matchesSensitivity = sensitivityFilter === "all" || item.sensitivity === sensitivityFilter

    return matchesSearch && matchesCategory && matchesSensitivity
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Data</h1>
          <p className="text-muted-foreground">Manage and protect your personal information</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Sensitivity: {sensitivityFilter === "all" ? "All" : sensitivityFilter}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSensitivityFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSensitivityFilter("high")}>High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSensitivityFilter("medium")}>Medium</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSensitivityFilter("low")}>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export All Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Data Storage</CardTitle>
            <CardDescription>Total data stored in your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative flex h-36 w-36 items-center justify-center">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                    className="text-muted opacity-20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * encryptionPercentage) / 100}
                    className="text-primary"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{encryptionPercentage}%</span>
                  <span className="text-xs text-muted-foreground">Encrypted</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Total Data: <span className="font-medium">{totalDataSize.toFixed(1)} MB</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Encrypted: <span className="font-medium">{encryptedDataSize.toFixed(1)} MB</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Data Categories</CardTitle>
            <CardDescription>Breakdown of your stored information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <UserDataChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Data Protection</CardTitle>
            <CardDescription>Security status of your information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Encryption</span>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Data Retention</span>
                </div>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                  Review Needed
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Access Controls</span>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  Configured
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Backup Status</span>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  Up to Date
                </Badge>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full gap-2">
                  <Lock className="h-4 w-4" />
                  Review Security Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search data by name or description..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Data Inventory</CardTitle>
            <CardDescription>
              {filteredData.length} {filteredData.length === 1 ? "item" : "items"} found
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[400px]">
              <div className="space-y-1 p-1">
                {filteredData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "h-auto w-full justify-start p-3 text-left",
                        selectedItem?.id === item.id && "bg-accent",
                      )}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-primary" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              item.sensitivity === "high" && "bg-red-500/10 text-red-500",
                              item.sensitivity === "medium" && "bg-yellow-500/10 text-yellow-500",
                              item.sensitivity === "low" && "bg-green-500/10 text-green-500",
                            )}
                          >
                            {item.sensitivity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <span>{item.size}</span>
                            {item.encrypted && <Lock className="h-3 w-3 text-green-500" />}
                          </div>
                          <span>Updated: {new Date(item.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}

                {filteredData.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Database className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No data found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">No data matches your current filters</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Data Details</CardTitle>
            <CardDescription>View and manage selected data</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {selectedItem ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{selectedItem.name}</h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      selectedItem.sensitivity === "high" && "bg-red-500/10 text-red-500",
                      selectedItem.sensitivity === "medium" && "bg-yellow-500/10 text-yellow-500",
                      selectedItem.sensitivity === "low" && "bg-green-500/10 text-green-500",
                    )}
                  >
                    {selectedItem.sensitivity} sensitivity
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                    <p>{selectedItem.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                      <p className="capitalize">{selectedItem.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Size</h4>
                      <p>{selectedItem.size}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Last Updated</h4>
                      <p>{new Date(selectedItem.lastUpdated).toLocaleString()}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Encryption Status</h4>
                      <div className="flex items-center gap-2">
                        {selectedItem.encrypted ? (
                          <>
                            <Lock className="h-4 w-4 text-green-500" />
                            <span className="text-green-500">Encrypted</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            <span className="text-yellow-500">Not Encrypted</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 text-sm font-medium">Data Access History</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last accessed by you</span>
                        <span>Today, 10:23 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last system access</span>
                        <span>Yesterday, 3:45 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total access count</span>
                        <span>24 times</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  {!selectedItem.encrypted && (
                    <Button variant="outline" className="flex-1 gap-2">
                      <Lock className="h-4 w-4" />
                      Encrypt
                    </Button>
                  )}
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No Data Selected</h3>
                <p className="text-muted-foreground">Select a data item from the inventory to view its details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Management Actions</CardTitle>
          <CardDescription>Common actions for managing your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
              <Download className="h-6 w-6" />
              <div className="text-center">
                <h3 className="font-medium">Download All Data</h3>
                <p className="text-xs text-muted-foreground">Get a complete copy of your data</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
              <Upload className="h-6 w-6" />
              <div className="text-center">
                <h3 className="font-medium">Import Data</h3>
                <p className="text-xs text-muted-foreground">Upload data from another source</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
              <Lock className="h-6 w-6" />
              <div className="text-center">
                <h3 className="font-medium">Encrypt All Data</h3>
                <p className="text-xs text-muted-foreground">Secure all unencrypted data</p>
              </div>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex w-full items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Data retention policy: Your data is stored for 12 months after account closure
            </p>
            <Button variant="link" className="h-auto p-0">
              View Data Policy
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
