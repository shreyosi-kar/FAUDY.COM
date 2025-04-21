"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CreditCard,
  Plus,
  Lock,
  Clock,
  Shield,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface Transaction {
  id: string
  type: "payment" | "subscription" | "refund"
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
  description: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "subscription",
    amount: 29.99,
    status: "completed",
    date: "2025-04-22T10:00:00Z",
    description: "Monthly Security Suite Subscription",
  },
  {
    id: "2",
    type: "payment",
    amount: 49.99,
    status: "completed",
    date: "2025-04-20T15:30:00Z",
    description: "Premium Security Add-on",
  },
  {
    id: "3",
    type: "refund",
    amount: 19.99,
    status: "pending",
    date: "2025-04-19T09:15:00Z",
    description: "Unused Feature Refund",
  },
]

export default function PaymentsPage() {
  const [filter, setFilter] = useState("all")
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payments & Billing</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscription</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$29.99/mo</div>
            <p className="text-xs text-muted-foreground">Premium Security Suite</p>
            <div className="mt-4 flex items-center space-x-2">
              <Badge variant="secondary">
                <CheckCircle className="mr-1 h-3 w-3" />
                Active
              </Badge>
              <Badge variant="outline">Next payment: May 22, 2025</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-12 rounded bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">•••• 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
                <Badge>Default</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Settings</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Payment Verification</div>
                <div className="text-xs text-muted-foreground">Require 2FA for all payments</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Transaction Alerts</div>
                <div className="text-xs text-muted-foreground">Get notified about all transactions</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search transactions..." className="pl-8" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("completed")}>Completed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("failed")}>Failed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "p-2 rounded-full",
                      transaction.status === "completed" && "bg-green-500/10",
                      transaction.status === "pending" && "bg-yellow-500/10",
                      transaction.status === "failed" && "bg-red-500/10"
                    )}>
                      {transaction.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {transaction.status === "pending" && <Clock className="h-4 w-4 text-yellow-500" />}
                      {transaction.status === "failed" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()} at{" "}
                        {new Date(transaction.date).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={cn(
                        "text-sm font-medium",
                        transaction.type === "refund" && "text-red-500"
                      )}>
                        {transaction.type === "refund" ? "-" : ""}${transaction.amount}
                      </p>
                      <Badge variant="outline" className="capitalize">
                        {transaction.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}