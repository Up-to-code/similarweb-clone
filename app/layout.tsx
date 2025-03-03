import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SimilarWeb Clone',
  description: 'A web analytics dashboard inspired by SimilarWeb, built with Next.js, React, and the SimilarWeb Traffic API. This application allows users to analyze website traffic data, including visitor statistics, engagement metrics, traffic sources, and more.',
  generator: 'SimilarWeb Clone Generator',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
