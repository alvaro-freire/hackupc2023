'use client'

import React, { useState } from 'react';
import { CredentialsContext } from '@/hooks/useCredentials'

export const metadata = {
  title: 'Vueling',
  description: 'An in air entertainment system'
}

interface IProps {
  children: React.ReactNode
}

const layoutServer: React.FC<IProps> = ({ children }) => {

  const [tocken, setTocken] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [seat, setSeat] = useState<string>('');

  const handleChangeTocken = (value: string) => {
    setTocken(value);
  }
  const handleChangeNickname = (value: string) => {
    setNickname(value);
  }
  const handleChangeSeat = (value: string) => {
    setSeat(value);
  }
  return (
    <>
      <CredentialsContext.Provider value={{
        token: tocken,
        nickname,
        seat,
        setToken: handleChangeTocken,
        setNickname: handleChangeNickname,
        setSeat: handleChangeSeat
      }}>
        {children}
      </CredentialsContext.Provider>
    </>
  );
}

export default layoutServer;

