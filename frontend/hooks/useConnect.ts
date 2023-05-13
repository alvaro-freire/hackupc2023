import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const useOpenSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const initalizeSocket = async () => {
    setSocket(() => io('http://localhost:4000'));
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
