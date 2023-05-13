import MainHeader from '@/components/atoms/typography/MainHeader'
import MainFooter from '@/components/atoms/typography/MainFooter'

import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vueling',
  description: 'An in air entertainment system'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full flex flex-col gap-2 pb-5 ">
          <MainHeader />
          {children}
          <MainFooter />
        </div>
      </body>
    </html>
  )
}
