import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Keyword {
  Name: string
  Volume: number
  EstimatedValue: number
  Cpc: number | null
}

interface TopKeywordsProps {
  keywords: Keyword[]
}

export default function TopKeywords({ keywords }: TopKeywordsProps) {
  if (!keywords || keywords.length === 0) {
    return <div className="py-8 text-center text-gray-500">No keyword data available</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Keyword</TableHead>
          <TableHead className="text-right">Search Volume</TableHead>
          <TableHead className="text-right">Traffic Share</TableHead>
          <TableHead className="text-right">CPC</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {keywords.map((keyword, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{keyword.Name}</TableCell>
            <TableCell className="text-right">{keyword.Volume.toLocaleString()}</TableCell>
            <TableCell className="text-right">{(keyword.EstimatedValue / 100000).toFixed(2)}%</TableCell>
            <TableCell className="text-right">{keyword.Cpc ? `$${keyword.Cpc.toFixed(2)}` : "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

