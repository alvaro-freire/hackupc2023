'use client'

import React, { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CredentialsContext } from '@/hooks/useCredentials'
import { usePathname, useRouter } from 'next/navigation';

interface IProps {
  children: React.ReactNode
}

const layoutServer: React.FC<IProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [token, setToken] = useLocalStorage<string>('token', '');
  const [nickname, setNickname] = useLocalStorage<string>('nickname', '');
  const [seat, setSeat] = useLocalStorage<string>('seat', '');

  const handleChangeTocken = (value: string) => {
    setToken(() => value);
  };

  const handleChangeNickname = (value: string) => {
    setNickname(() => value);
  };

  const handleChangeSeat = (value: string) => {
    setSeat(() => value);
  };

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

