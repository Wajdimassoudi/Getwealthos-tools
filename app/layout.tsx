import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'GetWealth OS - أدواتي | تحميل تيكتوك، شعارات، موسيقى مجاناً',
  description: 'منصة أدوات مجانية شاملة: تحميل تيكتوك، صانع شعارات، مُعرف الموسيقى Shazam، بريد مؤقت، ومساعد ذكي',
  generator: 'v0.app',
  keywords: ['تحميل تيكتوك', 'صانع شعارات', 'أدوات مجانية', 'Shazam', 'بريد مؤقت', 'AI Chat'],
  authors: [{ name: 'GetWealth OS' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'GetWealth OS',
  },
  openGraph: {
    title: 'GetWealth OS - أدوات مجانية شاملة',
    description: 'تحميل تيكتوك، صانع شعارات، موسيقى، وأكثر - مجاناً',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
