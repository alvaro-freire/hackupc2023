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
    <div className="pl-4 pr-4 flex gap-10 flex-col">
      <ChatInfo {...mockChatInfo} />
      <ChatContent messages={mockMessages} />
      <MessageBox />
    </div>
  );
}

export default Chat;
