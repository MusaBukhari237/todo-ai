import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ToDo By Musa Bukhari',
  description: 'ToDo.ai - Developed by Musa Bukhari',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme="winter" lang="en">
      <body className='w-full h-screen'>
        {children}
      </body>
    </html>
  )
}
