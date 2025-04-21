"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link, Search, Filter, ChevronDown, ExternalLink, Clock, Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type BlockchainLog = {
  id: string
  type: "transaction" | "alert" | "verification"
  status: "success" | "pending" | "failed"
  title: string
  description: string
  timestamp: string
  hash: string
}

const blockchainLogs: BlockchainLog[] = [
  {
    id: "1",
    type: "transaction",
    status: "success",
    title: "Account verification",
    description: "Email verification completed successfully",
    timestamp: "2023-06-15T14:32:21Z",
    hash: "0x7f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3f2e1d",
  },
  {
    id: "2",
    type: "alert",
    status: "failed",
    title: "Suspicious login attempt",
    description: "Login attempt from unknown device blocked",
    timestamp: "2023-06-14T09:15:43Z",
    hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s",
  },
  {
    id: "3",
    type: "verification",
    status: "success",
    title: "Two-factor authentication",
    description: "2FA enabled for account security",
    timestamp: "2023-06-13T18:45:12Z",
    hash: "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a",
  },
  {
    id: "4",
    type: "transaction",
    status: "pending",
    title: "Password update",
    description: "Password change request initiated",
    timestamp: "2023-06-12T11:22:33Z",
    hash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
  },
  {
    id: "5",
    type: "alert",
    status: "failed",
    title: "Phishing attempt detected",
    description: "Malicious URL blocked from being accessed",
    timestamp: "2023-06-11T07:55:19Z",
    hash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u",
  },
  {
    id: "6",
    type: "verification",
    status: "success",
    title: "Device authorization",
    description: "New device added to trusted devices",
    timestamp: "2023-06-10T15:30:45Z",
    hash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v",
  },
  {
    id: "7",
    type: "transaction",
    status: "success",
    title: "Account recovery",
    description: "Account recovery process completed",
    timestamp: "2023-06-09T12:10:33Z",
    hash: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w",
  },
  {
    id: "8",
    type: "alert",
    status: "failed",
    title: "Brute force attack",
    description: "Multiple failed login attempts detected",
    timestamp: "2023-06-08T23:42:11Z",
    hash: "0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x",
  },
]

export default function BlockchainLogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLog, setSelectedLog] = useState<BlockchainLog | null>(null)

  const filteredLogs = blockchainLogs.filter(
    (log) =>
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.hash.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blockchain Log</h1>
          <p className="text-muted-foreground">Immutable record of all security events and transactions</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Events</DropdownMenuItem>
            <DropdownMenuItem>Transactions Only</DropdownMenuItem>
            <DropdownMenuItem>Alerts Only</DropdownMenuItem>
            <DropdownMenuItem>Verifications Only</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, description or hash..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid flex-1 gap-4 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Event Timeline</CardTitle>
            <CardDescription>Chronological record of security events</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-2 p-4">
                {filteredLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "h-auto w-full justify-start p-3 text-left",
                        selectedLog?.id === log.id && "bg-accent",
                      )}
                      onClick={() => setSelectedLog(log)}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {log.type === "transaction" && <Link className="h-4 w-4 text-primary" />}
                            {log.type === "alert" && <AlertTriangle className="h-4 w-4 text-destructive" />}
                            {log.type === "verification" && <Shield className="h-4 w-4 text-green-500" />}
                            <span className="font-medium">{log.title}</span>
                          </div>
                          <Badge
                            variant={
                              log.status === "success"
                                ? "default"
                                : log.status === "pending"
                                  ? "outline"
                                  : "destructive"
                            }
                            className="ml-auto"
                          >
                            {log.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{log.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                          <div className="truncate max-w-[120px]">{log.hash.substring(0, 10)}...</div>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Detailed information about the selected event</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {selectedLog ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{selectedLog.title}</h3>
                  <Badge
                    variant={
                      selectedLog.status === "success"
                        ? "default"
                        : selectedLog.status === "pending"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {selectedLog.status}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                    <p>{selectedLog.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Event Type</h4>
                    <div className="flex items-center gap-2">
                      {selectedLog.type === "transaction" && <Link className="h-4 w-4 text-primary" />}
                      {selectedLog.type === "alert" && <AlertTriangle className="h-4 w-4 text-destructive" />}
                      {selectedLog.type === "verification" && <Shield className="h-4 w-4 text-green-500" />}
                      <span className="capitalize">{selectedLog.type}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Timestamp</h4>
                    <p>{new Date(selectedLog.timestamp).toLocaleString()}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Blockchain Hash</h4>
                    <div className="flex items-center gap-2">
                      <code className="rounded bg-muted px-2 py-1 text-sm">{selectedLog.hash}</code>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View on blockchain</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="raw">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="raw">Raw Data</TabsTrigger>
                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                  </TabsList>
                  <TabsContent value="raw" className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-xs">
                        {JSON.stringify(
                          {
                            id: selectedLog.id,
                            type: selectedLog.type,
                            status: selectedLog.status,
                            title: selectedLog.title,
                            description: selectedLog.description,
                            timestamp: selectedLog.timestamp,
                            hash: selectedLog.hash,
                            blockNumber: "14356789",
                            gasUsed: "21000",
                            nonce: "42",
                          },
                          null,
                          2,
                        )}
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="metadata">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Block Number</span>
                        <span className="text-sm">14356789</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Gas Used</span>
                        <span className="text-sm">21000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Nonce</span>
                        <span className="text-sm">42</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Created By</span>
                        <span className="text-sm">System</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">IP Address</span>
                        <span className="text-sm">192.168.1.1</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="verification">
                    <div className="flex flex-col items-center justify-center gap-4 py-8">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold">Verified on Blockchain</h3>
                      <p className="text-center text-muted-foreground">
                        This event has been cryptographically verified and cannot be altered.
                      </p>
                      <Button className="mt-2 gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View on Block Explorer
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Link className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No Event Selected</h3>
                <p className="text-muted-foreground">Select an event from the timeline to view its details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
