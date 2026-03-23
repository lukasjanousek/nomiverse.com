import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RV Infrastructure Platform',
  description: 'European RV infrastructure platform investor pitch deck',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
