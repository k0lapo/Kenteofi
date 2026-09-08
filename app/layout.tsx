import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kenteofi | Every talent deserves its moment',
  description: 'Kenteofi helps people grow, build talent, and prepare for moments worth celebrating.',
  generator: 'v0.app',
  icons: {
    icon: '/kenteofi-logo.png',
    shortcut: '/kenteofi-logo.png',
    apple: '/kenteofi-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0f5a39',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
