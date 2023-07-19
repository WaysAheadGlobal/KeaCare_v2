import React from 'react'
import './globals.css'
import { Inter, Rubik } from 'next/font/google'
import logo from '../../public/logo.png'
import Client from './client'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })
const rubic = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "KeaCare",
  icons: logo.src
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${rubic.className} overflow-x-hidden`} suppressHydrationWarning>
        <Client>
          {children}
        </Client>
      </body>
    </html>
  )
}
