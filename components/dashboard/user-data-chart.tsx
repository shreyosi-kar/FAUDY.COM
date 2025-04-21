"use client"

import { useState } from "react"
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const categoryData = [
  { name: "Personal", value: 15, color: "#8b5cf6" },
  { name: "Financial", value: 25, color: "#ef4444" },
  { name: "Security", value: 30, color: "#f59e0b" },
  { name: "Preferences", value: 10, color: "#10b981" },
  { name: "Activity", value: 20, color: "#3b82f6" },
]

const sensitivityData = [
  { name: "High", value: 40, color: "#ef4444" },
  { name: "Medium", value: 35, color: "#f59e0b" },
  { name: "Low", value: 25, color: "#10b981" },
]

export function UserDataChart() {
  const [activeTab, setActiveTab] = useState("category")

  return (
    <Tabs defaultValue="category" onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="category">By Category</TabsTrigger>
        <TabsTrigger value="sensitivity">By Sensitivity</TabsTrigger>
      </TabsList>
      <TabsContent value="category" className="space-y-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`${value} MB`, "Size"]}
                labelFormatter={(index) => categoryData[index].name}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      <TabsContent value="sensitivity" className="space-y-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sensitivityData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {sensitivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`${value}%`, "Percentage"]}
                labelFormatter={(index) => sensitivityData[index].name}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  )
}
