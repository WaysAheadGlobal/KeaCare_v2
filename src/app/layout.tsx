import React from 'react'
import './globals.css'
import { Inter, Rubik } from 'next/font/google'
import logo from '../../public/logo.png'
import Client from './client'
import { Metadata } from 'next'
import Script from 'next/script'


const inter = Inter({ subsets: ['latin'] })
const rubic = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "KeaCare",
  icons: logo.src
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','GTM-NNL5B72');`}
        </Script>
      </head>
      <body className={`${rubic.className} overflow-x-hidden`} suppressHydrationWarning>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNL5B72"
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
        <Client>
          {children}
        </Client>
      </body>
    </html>
  )
}
