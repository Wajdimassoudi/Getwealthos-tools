import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'tools OS go - أدوات مجانية للجميع',
  description: 'منصة أدوات مجانية عصرية وسهلة الاستخدام: تحميل تيكتوك، صانع شعارات، مُعرف الموسيقى، وأكثر',
  generator: 'v0.app',
  keywords: ['أدوات مجانية', 'tools', 'تحميل', 'صانع شعارات', 'موسيقى', 'AI'],
  authors: [{ name: 'tools OS go' }],
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
    title: 'tools OS go',
  },
  openGraph: {
    title: 'tools OS go - أدوات مجانية عصرية',
    description: 'منصة أدوات مجانية متقدمة وسهلة الاستخدام للجميع',
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
