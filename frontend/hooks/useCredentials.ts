'use client'

import React, { useState, createContext, useContext } from 'react';

export interface ICredentials {
    token: string;
    nickname: string;
    seat: string;
    setToken: (tocken: string) => void;
    setNickname: (nickname: string) => void;
    setSeat: (seat: string) => void;
}

export const CredentialsContext = createContext<ICredentials>(
    {
        token: '',
        nickname: '',
        seat: '',
        setToken: () => {},
        setNickname: () => {},
        setSeat: () => {}
    }
);

const useCredentials = (): ICredentials => {
    const credentials = useContext(CredentialsContext);

    return credentials;
}

export default useCredentials;