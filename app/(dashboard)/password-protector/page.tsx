"use client"

import { useState } from "react"
import { RefreshCw, Shield, AlertTriangle, CheckCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PasswordEntry {
  id: string
  title: string
  username: string
  password: string
  website: string
  category: string
  lastUpdated: string
  strength: number
}

const passwordEntries: PasswordEntry[] = [
  {
    id: "1",
    title: "Personal Email",
    username: "john.doe@example.com",
    password: "P@ssw0rd123!",
    website: "gmail.com",
    category: "email",
    lastUpdated: "2023-06-15T14:32:21Z",
    strength: 75,
  },
  {
    id: "2",
    title: "Work Email",
    username: "john.doe@company.com",
    password: "W0rkP@ss2023!",
    website: "outlook.com",
    category: "email",
    lastUpdated: "2023-06-10T09:15:43Z",
    strength: 85,
  },
  {
    id: "3",
    title: "Online Banking",
    username: "johndoe",
    password: "B@nk!ngS3cure123",
    website: "mybank.com",
    category: "financial",
    lastUpdated: "2023-05-20T18:45:12Z",
    strength: 95,
  },
  {
    id: "4",
    title: "Social Media",
    username: "john.doe",
    password: "S0c!alM3dia2023",
    website: "facebook.com",
    category: "social",
    lastUpdated: "2023-05-15T11:22:33Z",
    strength: 70,
  },
  {
    id: "5",
    title: "Shopping",
    username: "john.doe@example.com",
    password: "Sh0pp!ng123",
    website: "amazon.com",
    category: "shopping",
    lastUpdated: "2023-05-05T07:55:19Z",
    strength: 65,
  },
  {
    id: "6",
    title: "Streaming Service",
    username: "johndoe",
    password: "Str3@m!ngN0w",
    website: "netflix.com",
    category: "entertainment",
    lastUpdated: "2023-04-28T15:30:45Z",
    strength: 80,
  },
]

const getStrengthColor = (strength: number) => {
  if (strength >= 80) return "text-green-500"
  if (strength >= 60) return "text-yellow-500"
  return "text-red-500"
}

const getStrengthText = (strength: number) => {
  if (strength >= 80) return "Strong"
  if (strength >= 60) return "Medium"
  return "Weak"
}

const getProgressColor = (strength: number) => {
  if (strength >= 80) return "bg-green-500"
  if (strength >= 60) return "bg-yellow-500"
  return "bg-red-500"
}

export default function PasswordProtectorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedEntry, setSelectedEntry] = useState<PasswordEntry | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<PasswordEntry>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const handleEditClick = () => {
    if (selectedEntry) {
      setEditForm({ ...selectedEntry })
      setIsEditing(true)
    }
  }

  const handleSaveEdit = () => {
    // In a real app, this would save to a database
    setIsEditing(false)
    // Update the selected entry with the edited values
    if (selectedEntry && editForm) {
      setSelectedEntry({ ...selectedEntry, ...editForm })
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm({})
  }

  const handleCopyPassword = () => {
    if (selectedEntry) {
      navigator.clipboard.writeText(selectedEntry.password)
      // In a real app, you would show a toast notification here
    }
  }

  const generatePassword = () => {
    setIsGenerating(true)
    
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    let chars = ""
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols
    
    if (chars.length === 0) chars = lowercase + numbers
    
    let password = ""
    for (let i = 0; i < passwordLength; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    setGeneratedPassword(password)
  }

  const filteredEntries = passwordEntries.filter((entry) => {
    // Filter by search query
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.website.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab (category)
    const matchesCategory = activeTab === "all" || entry.category === activeTab

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Password Protector</h1>
          <p className="text-muted-foreground">Securely store and manage your passwords</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setIsGenerating(true)}>
            <RefreshCw className="h-4 w-4" />
            Generate Password
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Password
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Password Health</CardTitle>
            <CardDescription>Overall security status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
                      strokeDashoffset="70"
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">75%</span>
                    <span className="text-xs text-muted-foreground">Health Score</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Reused Passwords</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                    2 Found
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Weak Passwords</span>
                  </div>
                  <Badge variant="outline" className="bg-red-500/10 text-red-500">
                    1 Found
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Strong Passwords</span>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    3 Found
                  </Badge>
                </div>
              </div>

              <Button variant="outline" className="w-full gap-2">
                <Shield className="h-4 w-4" />
                Run Security Check
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
