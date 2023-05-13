'use client'

import { useState } from "react";

import useCredentials from "@/hooks/useCredentials";
import { useRouter } from 'next/navigation';

const Login = () => {
  const [seat, setSeat] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string>('');

  const credentials = useCredentials();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        body: JSON.stringify({ seat, nickname })
      });

      if (!response.ok) { throw new Error(); }
      const json = await response.json();

      const { token } = json;

      credentials.setToken(token);
      router.push('/');

      console.log(token);
    } catch (e: any) {
      setSeat('');
      setNickname('');
      setError('Invalid credentials');
    }
  }

  return (
    <div className="w-full">
      { credentials.token }
      <h1 className="text-2xl text-center my-8">
        Introduce tus datos para nuestras movidas:
      </h1>
      <form className="w-auto mx-6">
        <div className="flex flex-col w-full">
          <label className="ml-3">
            Asiento
          </label>
          <input type="text" value={seat} onChange={(e) => {setSeat(e.target.value)}} className="h-8 border-2 rounded-md border-black hover:border-primary focus-visible:border-primary p-3"/>
        </div>
        <div>
          <label className="ml-3">
            Nickname
          </label>
          <input type="text" value={nickname} onChange={(e) => {setNickname(e.target.value)}} className="h-8 border-2 rounded-md border-black hover:border-primary focus-visible:border-primary p-3"/>
        </div>
        <button
          onClick={(e) => { handleSubmit(e); }}
          type="submit"
          className="my-5 p-3 h-12 w-auto bg-primary font-bold decoration-gray">
            Acceder
            </button>
      </form>
    </div>
  )
}

export default Login;