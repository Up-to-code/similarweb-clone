import { Globe, BarChart2, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface SiteOverviewProps {
  data: any
}

export default function SiteOverview({ data }: SiteOverviewProps) {
  if (!data) return null

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-start gap-4">
        {data.LargeScreenshot ? (
          <img
            src={data.LargeScreenshot || "/placeholder.svg"}
            alt={data.SiteName}
            className="w-16 h-16 object-cover rounded-lg border"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <Globe className="h-8 w-8 text-gray-400" />
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{data.SiteName}</h1>
          <p className="text-gray-500">{data.Category.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</p>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <BarChart2 className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">Global Rank</div>
                  <div className="text-lg font-semibold">#{data.GlobalRank.Rank.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Award className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">Category Rank</div>
                  <div className="text-lg font-semibold">#{data.CategoryRank.Rank}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Globe className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">Country Rank</div>
                  <div className="text-lg font-semibold">
                    {data.CountryRank ? (
                      <>
                        #{data.CountryRank.Rank} in {data.CountryRank.CountryCode}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

