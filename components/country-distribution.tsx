"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"

interface Country {
  Country: number
  CountryCode: string
  Value: number
}

interface CountryDistributionProps {
  countries: Country[]
  showAll?: boolean
}

export default function CountryDistribution({ countries, showAll = false }: CountryDistributionProps) {
  const [showAllCountries, setShowAllCountries] = useState(showAll)

  if (!countries || countries.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>
  }

  const displayedCountries = showAllCountries ? countries : countries.slice(0, 5)

  const chartData = displayedCountries.map((country) => ({
    country: country.CountryCode,
    value: (country.Value * 100).toFixed(1),
  }))

  const formatTooltip = (value: string) => {
    return `${value}%`
  }

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              domain={[0, "dataMax"]}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey="country"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={40}
            />
            <Tooltip formatter={formatTooltip} />
            <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Traffic Share" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {!showAll && countries.length > 5 && (
        <div className="text-center">
          <Button variant="outline" size="sm" onClick={() => setShowAllCountries(!showAllCountries)}>
            {showAllCountries ? "Show Less" : "Show All Countries"}
          </Button>
        </div>
      )}
    </div>
  )
}

