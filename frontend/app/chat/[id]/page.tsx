import React from 'react';
import ChatInfo from '@/components/molecules/chats/ChatInfo';
import ChatContent from '@/components/molecules/chats/ChatContent';
import MessageBox from '@/components/molecules/chats/MessageBox';

import { mockChatInfo, mockMessages } from '@/migrations/chat.data';

interface IProps {
  params: { id: string }
}

const Chat: React.FC<IProps> = () => {
  return (
    <>
      <ChatInfo {...mockChatInfo} />
      <ChatContent messages={mockMessages} />
      <MessageBox />
    </>
  );
}

export default Chat;
