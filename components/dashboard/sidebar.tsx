"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Shield,
  Home,
  MessageSquare,
  Bell,
  LinkIcon,
  CreditCard,
  AlertCircle,
  Database,
  KeyRound,
  User,
  Phone,
  Info,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "AI Chat Assistant", href: "/ai-chat", icon: MessageSquare },
  { name: "Fraud Alerts", href: "/fraud-alerts", icon: Bell },
  { name: "Blockchain Log", href: "/blockchain-log", icon: LinkIcon },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Alerts & Notifications", href: "/alerts", icon: AlertCircle },
  { name: "User Data", href: "/user-data", icon: Database },
  { name: "Password Protector", href: "/password-protector", icon: KeyRound },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Contact Us", href: "/contact", icon: Phone },
  { name: "About Us", href: "/about", icon: Info },

]

export function DashboardSidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-screen border-r bg-card relative"
          >
            <div className="flex h-16 items-center justify-between px-4 border-b">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">FAUDY</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <div className="px-3 py-2">
                <nav className="flex flex-col gap-1">
                  {sidebarItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                        )}
                      >
                        <item.icon className={cn("h-4 w-4", isActive && "text-primary")} />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </ScrollArea>
            <div className="absolute bottom-0 left-0 right-0 border-t p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">FAUDY</p>
                    <p className="text-xs text-muted-foreground">faudy@gmail.com</p>
                  </div>
                </div>
                <ModeToggle />
              </div>
              <Button variant="ghost" className="w-full justify-start mt-3 text-muted-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-screen border-r bg-card flex flex-col items-center"
          >
            <div className="flex h-16 items-center justify-center border-b w-full">
              <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)] w-full">
              <div className="py-2 flex flex-col items-center gap-1">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-center h-10 w-10 rounded-lg transition-all hover:bg-accent",
                        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                      )}
                      title={item.name}
                    >
                      <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                    </Link>
                  )
                })}
              </div>
            </ScrollArea>
            <div className="border-t p-3 w-full flex justify-center">
              <ModeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
