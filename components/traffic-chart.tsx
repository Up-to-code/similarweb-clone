"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TrafficChartProps {
  data: Record<string, number>
}

export default function TrafficChart({ data }: TrafficChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (data) {
      const formattedData = Object.entries(data).map(([date, visits]) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })

        return {
          date: formattedDate,
          visits: visits,
        }
      })

      setChartData(formattedData)
    }
  }, [data])

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return value
  }

  const formatTooltip = (value: number) => {
    return value.toLocaleString()
  }

  if (chartData.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatYAxis} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <Tooltip formatter={formatTooltip} labelFormatter={(label) => `Date: ${label}`} />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
            name="Visits"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

