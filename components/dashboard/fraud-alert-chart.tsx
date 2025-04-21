"use client"

import { useState } from "react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const weeklyData = [
  { name: "Mon", account: 2, payment: 1, identity: 0, device: 1, phishing: 3 },
  { name: "Tue", account: 1, payment: 2, identity: 1, device: 0, phishing: 1 },
  { name: "Wed", account: 3, payment: 0, identity: 2, device: 1, phishing: 0 },
  { name: "Thu", account: 0, payment: 1, identity: 1, device: 2, phishing: 1 },
  { name: "Fri", account: 1, payment: 3, identity: 0, device: 1, phishing: 2 },
  { name: "Sat", account: 0, payment: 1, identity: 0, device: 0, phishing: 1 },
  { name: "Sun", account: 1, payment: 0, identity: 1, device: 0, phishing: 0 },
]

const monthlyData = [
  { name: "Jan", account: 5, payment: 8, identity: 3, device: 4, phishing: 10 },
  { name: "Feb", account: 7, payment: 6, identity: 4, device: 5, phishing: 8 },
  { name: "Mar", account: 4, payment: 5, identity: 6, device: 3, phishing: 7 },
  { name: "Apr", account: 6, payment: 4, identity: 5, device: 6, phishing: 5 },
  { name: "May", account: 8, payment: 7, identity: 2, device: 4, phishing: 6 },
  { name: "Jun", account: 9, payment: 5, identity: 4, device: 3, phishing: 4 },
]

export function FraudAlertChart() {
  const [activeTab, setActiveTab] = useState("weekly")

  return (
    <Tabs defaultValue="weekly" onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="weekly">Weekly</TabsTrigger>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
      </TabsList>
      <TabsContent value="weekly" className="space-y-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Bar dataKey="account" name="Account" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="payment" name="Payment" stackId="a" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="identity" name="Identity" stackId="a" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="device" name="Device" stackId="a" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="phishing" name="Phishing" stackId="a" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      <TabsContent value="monthly" className="space-y-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Line type="monotone" dataKey="account" name="Account" stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line type="monotone" dataKey="payment" name="Payment" stroke="hsl(var(--destructive))" strokeWidth={2} />
              <Line type="monotone" dataKey="identity" name="Identity" stroke="hsl(38, 92%, 50%)" strokeWidth={2} />
              <Line type="monotone" dataKey="device" name="Device" stroke="hsl(142, 71%, 45%)" strokeWidth={2} />
              <Line type="monotone" dataKey="phishing" name="Phishing" stroke="hsl(262, 83%, 58%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  )
}
