import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { JetBrains_Mono } from 'next/font/google'

import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Xai — Intelligence Workspace',
  description: 'From raw data to structured intelligence to actionable insight.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
