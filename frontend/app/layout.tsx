'use client'

import { useState } from 'react';
import MainHeader from '@/components/atoms/typography/MainHeader'
import MainFooter from '@/components/atoms/typography/MainFooter'

import { Inter } from 'next/font/google'
import { CredentialsContext } from '@/hooks/useCredentials'
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
  const [tocken, setTocken] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [seat, setSeat] = useState<string>('');

  const handleChangeTocken = (value: string)  => {
    setTocken(value);
  }
  const handleChangeNickname = (value: string)  => {
    setNickname(value);
  }
  const handleChangeSeat = (value: string)  => {
    setSeat(value);
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full flex flex-col gap-2 pr-4 pl-4 pb-5 ">
          <CredentialsContext.Provider value={{
            token: tocken,
            nickname,
            seat,
            setToken: handleChangeTocken,
            setNickname: handleChangeNickname,
            setSeat: handleChangeSeat
          }}>
            <MainHeader />
            {children}
            <MainFooter />
          </CredentialsContext.Provider>
        </div>
      </body>
    </html>
  )
}
