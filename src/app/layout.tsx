"use client"

import React, { useMemo, useState } from 'react'
import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import UserTypeContext from '@/context/UserType'
import logo from '../../public/logo.png'
import Login from '@/components/Login'
import Signup from '@/components/Signup'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<"careseeker" | "caregiver">("careseeker");
  const values = useMemo(() => ({ userType, setUserType }), [userType]);

  return (
    <html lang="en">
      <head>
        <title>KeaCare</title>
        <link rel="shortcut icon" href={logo.src} type="image/png" />
      </head>
      <body className={`${inter.className} bg-[#ecece7]`}>
        <UserTypeContext.Provider value={values} >
          <Navbar />
          <Login />
          <Signup />
          {children}
          <Footer />
        </UserTypeContext.Provider>
      </body>
    </html>
  )
}
