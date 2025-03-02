"use client"

import { useState } from "react"
import { Search, Globe, TrendingUp, Users, Clock, MousePointer } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TrafficChart from "@/components/traffic-chart"
import CountryDistribution from "@/components/country-distribution"
import TrafficSourcesChart from "@/components/traffic-sources-chart"
import TopKeywords from "@/components/top-keywords"
import SiteOverview from "@/components/site-overview"

export default function Home() {
  const [domain, setDomain] = useState("")
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchData = async () => {
    if (!domain) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/traffic?domain=${domain}`)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError("Failed to fetch data. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold">SimilarWeb Clone</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Select defaultValue="last3months">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last3months">Last 3 Months</SelectItem>
                  <SelectItem value="last6months">Last 6 Months</SelectItem>
                  <SelectItem value="lastyear">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter a website (e.g., x.com)"
                className="pl-10 h-12"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchData()}
              />
            </div>
            <Button className="h-12 px-6" onClick={fetchData} disabled={loading || !domain}>
              {loading ? "Loading..." : "Analyze"}
            </Button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {data ? (
          <div className="space-y-6">
            <SiteOverview data={data} />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="geography">Geography</TabsTrigger>
                <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="competitors">Competitors</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Traffic Trend</CardTitle>
                      <CardDescription>Monthly visits over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TrafficChart data={data.EstimatedMonthlyVisits} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Engagement</CardTitle>
                      <CardDescription>User behavior metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                          <Clock className="h-5 w-5 text-blue-600 mb-2" />
                          <span className="text-sm text-gray-500">Avg. Visit Duration</span>
                          <span className="text-xl font-semibold">
                            {Math.round(Number.parseFloat(data.Engagments.TimeOnSite))}s
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                          <MousePointer className="h-5 w-5 text-blue-600 mb-2" />
                          <span className="text-sm text-gray-500">Pages per Visit</span>
                          <span className="text-xl font-semibold">
                            {Number.parseFloat(data.Engagments.PagePerVisit).toFixed(1)}
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                          <Users className="h-5 w-5 text-blue-600 mb-2" />
                          <span className="text-sm text-gray-500">Bounce Rate</span>
                          <span className="text-xl font-semibold">
                            {(Number.parseFloat(data.Engagments.BounceRate) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-blue-600 mb-2" />
                          <span className="text-sm text-gray-500">Total Visits</span>
                          <span className="text-xl font-semibold">
                            {Number.parseInt(data.Engagments.Visits).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Traffic Sources</CardTitle>
                      <CardDescription>Where visitors come from</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TrafficSourcesChart sources={data.TrafficSources} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Geographic Distribution</CardTitle>
                      <CardDescription>Top countries by traffic share</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CountryDistribution countries={data.TopCountryShares} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="geography" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                    <CardDescription>Detailed breakdown of traffic by country</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CountryDistribution countries={data.TopCountryShares} showAll />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="traffic" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription>Detailed breakdown of traffic sources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TrafficSourcesChart sources={data.TrafficSources} detailed />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="keywords" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Keywords</CardTitle>
                    <CardDescription>Keywords driving traffic to this site</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopKeywords keywords={data.TopKeywords} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="competitors" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Competitors</CardTitle>
                    <CardDescription>Similar websites in the same category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {data.Competitors.TopSimilarityCompetitors.length > 0 ? (
                      <div>Competitor data would be displayed here</div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">No competitor data available</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-16">
            <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Enter a website to analyze</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Get detailed traffic insights, engagement metrics, and more for any website
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

