import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

interface IConnectionData {
  chatId: string;
}

const useOpenSocket = ({ chatId }: IConnectionData): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const initalizeSocket = async () => {
    await fetch(`/api/chat?q=${chatId}`)
    setSocket(() => io());
  }

  useEffect(() => {
    initalizeSocket()

    return () => {
      socket?.disconnect();
      setSocket(null);
    }
  }, [])

  return socket;
};

export default useOpenSocket;
