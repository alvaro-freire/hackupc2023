'use client'

import { useState } from "react";

import useCredentials from "@/hooks/useCredentials";
import { useRouter } from 'next/navigation';
import Alert from '@/components/atoms/alerts/alert';

const Login = () => {
  const [seat, setSeat] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string>('');

  const credentials = useCredentials();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ seat, nickname })
      });

      if (!response.ok) { throw new Error(); }
      const json = await response.json();

      const { token } = json;

      credentials.setToken(token);
      credentials.setSeat(seat);
      credentials.setNickname(nickname);
      router.push('/');
    } catch (e: any) {
      setSeat('');
      setNickname('');
      setError('Invalid credentials');
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl text-center my-8">
        Introduce tus datos para nuestras movidas:
      </h1>
      {error &&
        <Alert
          text={error}
          onClose={() => {
            setError('')
          }}
        />
      }
      <form className="max-w-sm sm:w-96 w-64 mx-auto">
        <div className="flex flex-col w-full">
          <label> Asiento </label>
          <input
            type="text"
            onChange={(e) => {
              setSeat(e.target.value);
            }}
            className="h-8 border-2 rounded-md border-black hover:border-primary focus-visible:border-primary p-3" />
        </div>
        <div className="mt-5 flex flex-col w-full">
          <label> Nickname </label>
          <input type="text" value={nickname} onChange={(e) => { setNickname(e.target.value) }} className="h-8 border-2 rounded-md border-black hover:border-primary focus-visible:border-primary p-3" />
        </div>
        <button onClick={(e) => { handleSubmit(e); }} type="submit" className="mt-10 p-3 h-12 block mx-auto bg-primary font-bold decoration-gray">
          Acceder
        </button>
      </form>
    </div>
  )
}

export default Login;
