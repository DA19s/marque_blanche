"use client"

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface UserGrowthData {
  month: string
  users: number
}

interface CompletionData {
  module: string
  completions: number
  avgScore: number
}

interface AnalyticsChartsProps {
  userGrowthData: UserGrowthData[]
  completionData: CompletionData[]
}

export function AnalyticsCharts({ userGrowthData, completionData }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Croissance des Utilisateurs</h3>
          <p className="text-sm text-gray-600 mt-1">Évolution du nombre d'inscrits</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="var(--tenant-primary)" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Taux de Complétion par Module</h3>
          <p className="text-sm text-gray-600 mt-1">Pourcentage de complétion et scores moyens</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="module" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completions" fill="var(--tenant-primary)" />
              <Bar dataKey="avgScore" fill="var(--tenant-secondary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
