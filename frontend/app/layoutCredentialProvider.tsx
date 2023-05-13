'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CredentialsContext } from '@/hooks/useCredentials'
import { usePathname, useRouter } from 'next/navigation';

interface IProps {
  children: React.ReactNode
}

const layoutServer: React.FC<IProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [token, setTocken] = useLocalStorage<string>('token', '');
  const [nickname, setNickname] = useLocalStorage<string>('nickname', '');
  const [seat, setSeat] = useLocalStorage<string>('seat', '');

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
    if (pathname !== '/login' && !token) {
      router.push('/login');
    }
    if (pathname === '/login' && token) {
      router.push('/');
    }
  }, [pathname, token]);


  return (
    <>
      <CredentialsContext.Provider value={{
        token: token,
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

