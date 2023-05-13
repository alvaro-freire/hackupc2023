'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { CredentialsContext } from '@/hooks/useCredentials'
import { usePathname, useRouter } from 'next/navigation';

interface IProps {
  children: React.ReactNode
}

const layoutServer: React.FC<IProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [tocken, setTocken] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [seat, setSeat] = useState<string>('');

  const handleChangeTocken = useCallback((value: string) => {
    setTocken(value);
  }, []);

  const handleChangeNickname = useCallback((value: string) => {
    setNickname(value);
  }, []);

  const handleChangeSeat = useCallback((value: string) => {
    setSeat(value);
  }, []);

  useEffect(() => {
    if (pathname !== '/login' && !tocken) {
      router.push('/login');
    }
  }, [pathname]);


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

