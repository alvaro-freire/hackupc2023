'use client'

import React, { useEffect, useState } from 'react';
import { Socket } from "socket.io-client";

import ChatInfo from '@/components/molecules/chats/ChatInfo';
import ChatContent from '@/components/molecules/chats/ChatContent';
import MessageBox from '@/components/molecules/chats/MessageBox';
import Button from '@/components/atoms/buttons/button';

import useCredentials from '@/hooks/useCredentials';
import useOpenSocket from '@/hooks/useConnect';

import { IAuthor, IMessage } from '@/types/chat.types';

const Chat: React.FC = () => {
  const [isHidden, setHidden] = useState<boolean>(true);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<IMessage | string>>([]);
  const [user, setUser] = useState<IAuthor>({ seat: '', userId: '', username: '' });

  const socket: Socket | null = useOpenSocket();
  const { seat, nickname } = useCredentials();

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setInputMessage(value);
  }

  const emitOnSend = () => {
    if (socket) {
      socket.emit('roulette-message', inputMessage);
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
      socket.on('roulette-paired', (id) => { console.log(`paired with ${id}`) })
      socket.on('roulette-next', () => {
        setMessages([]);
        setHidden(true);
        setUser(() => ({ username: '', userId: '', seat: '' }))
      })
      socket.on('roulette-message', (message) => {
        setMessages((prev) => [...prev, {
          id: `${Math.floor(Math.random() * 1000000000)}`,
          content: message,
          author: {
            seat: user.seat,
            userId: user.userId,
            username: user.username
          }
        }])
      })
      socket.on('roulette-show', (n, s) => {
        setUser(() => ({ username: n, userId: s, seat: s }))
        setHidden(false);
      })

      socket.on('roulette-hide', () => {
        setUser(() => ({ username: '', userId: '', seat: '' }))
        setHidden(true);
      });

      socket.emit('roulette');
    }
  }

  const handleNext = () => {
    if (socket) {
      socket.emit('roulette-next');
      setMessages([]);
      setHidden(true);
    }
  }
  const handleShow = () => {
    if (socket) {
      socket.emit('roulette-show');
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
    <div className="pl-4 pr-4 max-w-lg w-96 mx-auto">
      <ChatInfo
        id=""
        user={user}
        isHidden={isHidden}
      >
        <div className="flex flex-col gap-2 w-100 h-100 flex-1 p-2 ">
          <Button text="Next" onClick={() => handleNext()} />
          <Button text="Show" onClick={() => handleShow()} />
        </div>
      </ChatInfo>
      <ChatContent messages={messages} />

      <MessageBox
        onChange={handleChangeInput}
        onSend={emitOnSend}
        value={inputMessage}
      />
    </div>
  )
}

export default Chat;