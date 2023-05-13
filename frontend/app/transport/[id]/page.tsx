import React from 'react';
import TransportChatInfo from '@/components/molecules/chats/TransportChatInfo';
import ChatContent from '@/components/molecules/chats/ChatContent';
import MessageBox from '@/components/molecules/chats/MessageBox';

interface IProps {
  params: { id: string }
}

import { mockTransportChatInfo, mockMessages } from '@/migrations/chat.data';

const TransportChat: React.FC<IProps> = () => {
  return (
    <>
      <TransportChatInfo {...mockTransportChatInfo} />
      <ChatContent messages={mockMessages} />
      <MessageBox />
    </>
  )
}

export default TransportChat;
