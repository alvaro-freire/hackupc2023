'use client'

import React, { useEffect, useState } from 'react';
import { Socket } from "socket.io-client";

import TransportChatInfo from '@/components/molecules/chats/TransportChatInfo';
import ChatContent from '@/components/molecules/chats/ChatContent';
import MessageBox from '@/components/molecules/chats/MessageBox';

import useCredentials from '@/hooks/useCredentials';
import useOpenSocket from '@/hooks/useConnect';

import { IMessage } from '@/types/chat.types';

interface IProps {
  params: { id: string }
}

import { mockTransportChatInfo } from '@/migrations/chat.data';

const TransportChat: React.FC<IProps> = ({ params }) => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const socket: Socket | null = useOpenSocket();
  const { seat, nickname } = useCredentials();

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
    console.log(seat, nickname);
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
    <>
      <TransportChatInfo {...mockTransportChatInfo} />
      <ChatContent messages={messages} />
      <MessageBox
        onChange={handleChangeInput}
        onSend={emitOnSend}
        value={inputMessage}
      />
    </>
  )
}

export default TransportChat;
