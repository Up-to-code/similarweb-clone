import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get("domain")

  if (!domain) {
    return NextResponse.json({ error: "Domain parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://similarweb-traffic.p.rapidapi.com/traffic?domain=${domain}`, {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
        "x-rapidapi-host": "similarweb-traffic.p.rapidapi.com",
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching traffic data:", error)
    return NextResponse.json({ error: "Failed to fetch traffic data" }, { status: 500 })
  }
}

