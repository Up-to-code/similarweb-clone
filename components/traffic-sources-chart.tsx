"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface TrafficSourcesChartProps {
  sources: Record<string, number>
  detailed?: boolean
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

export default function TrafficSourcesChart({ sources, detailed = false }: TrafficSourcesChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (sources) {
      const formattedData = Object.entries(sources).map(([name, value], index) => ({
        name,
        value: (value * 100).toFixed(1),
        color: COLORS[index % COLORS.length],
      }))

      setChartData(formattedData)
    }
  }, [sources])

  if (chartData.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    if (percent < 0.05) return null

    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const formatTooltip = (value: string) => {
    return `${value}%`
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={detailed ? undefined : renderCustomizedLabel}
            outerRadius={detailed ? 80 : 90}
            innerRadius={detailed ? 40 : 50}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={formatTooltip} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

