'use client'

import React, { useEffect, useState } from 'react';
import { Socket } from "socket.io-client";
import { useSearchParams } from 'next/navigation';

import TransportChatInfo from '@/components/molecules/chats/TransportChatInfo';
import ChatContent from '@/components/molecules/chats/ChatContent';
import MessageBox from '@/components/molecules/chats/MessageBox';

import useCredentials from '@/hooks/useCredentials';
import useOpenSocket from '@/hooks/useConnect';

import { IMessage } from '@/types/chat.types';

interface IProps {
  params: { id: string }
}

const TransportChat: React.FC<IProps> = ({ params }) => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<IMessage | string>>([]);
  const socket: Socket | null = useOpenSocket();
  const { seat, nickname } = useCredentials();

  const queryParams = useSearchParams();
  const destination = queryParams.get('destination');
  const method = queryParams.get('method');

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setInputMessage(value);
  }

  const emitOnSend = () => {
    if (socket) {
      socket.emit('message', inputMessage);
      setMessages((prev) => [...prev, {
        id: `${Math.floor(Math.random() * 1000000000)}`,
        content: inputMessage,
        author: {
          seat,
          userId: seat,
          username: nickname
        }
      }])
      setInputMessage('');
    }
  }

  const attachSocketFunctions = () => {
    if (socket) {
      socket.emit('set-data', nickname, seat);
      socket.emit('join', params.id);
      socket.on('left', (nickname, seat) => {
        setMessages((prev) => [...prev, `${nickname} (${seat}) left the chat`]);
      })
      socket.on('joined', (nickname, seat) => {
        setMessages((prev) => [...prev, `${nickname} (${seat}) joined the chat`]);
      })
      socket.on('message', (nickname, seat, message) => {
        setMessages((prev) => [...prev, {
          id: `${Math.floor(Math.random() * 1000000000)}`,
          content: message,
          author: {
            seat,
            userId: seat,
            username: nickname
          }
        }])
      })
    }
  }

  useEffect(() => {
    if (seat && nickname) {
      attachSocketFunctions();
    }
  }, [socket, seat, nickname]);

  useEffect(() => {
    return () => {
      socket?.disconnect()
    };
  }, []);

  return (
    <div className="pl-4 pr-4">
      <TransportChatInfo id={params.id} destination={destination || ''} method={method || ''} />
      <ChatContent messages={messages} />
      <MessageBox
        onChange={handleChangeInput}
        onSend={emitOnSend}
        value={inputMessage}
      />
    </div>
  )
}

export default TransportChat;
