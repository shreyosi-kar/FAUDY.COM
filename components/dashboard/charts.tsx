"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

const weeklyData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 8 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 5 },
  { name: "Fri", value: 10 },
  { name: "Sat", value: 3 },
  { name: "Sun", value: 2 },
]

const monthlyData = [
  { name: "Jan", value: 45 },
  { name: "Feb", value: 52 },
  { name: "Mar", value: 38 },
  { name: "Apr", value: 41 },
  { name: "May", value: 35 },
  { name: "Jun", value: 28 },
  { name: "Jul", value: 25 },
  { name: "Aug", value: 30 },
  { name: "Sep", value: 22 },
  { name: "Oct", value: 18 },
  { name: "Nov", value: 15 },
  { name: "Dec", value: 12 },
]

const riskData = [
  { name: "Low", value: 65, fill: "#22c55e" },
  { name: "Medium", value: 25, fill: "#eab308" },
  { name: "High", value: 10, fill: "#ef4444" },
]

export function DashboardCharts() {
  const [activeTab, setActiveTab] = useState("weekly")

  return (
    <Tabs defaultValue="weekly" onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="weekly">Weekly Fraud Attempts</TabsTrigger>
        <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
        <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
      </TabsList>
      <TabsContent value="weekly" className="space-y-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      <TabsContent value="monthly" className="space-y-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      <TabsContent value="risk" className="space-y-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  )
}
