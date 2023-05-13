import React from 'react';
import Message from './Message';

import { IMessage } from '@/types/chat.types';

interface IProps {
  messages: Array<IMessage>
}


const ChatContent: React.FC<IProps> = ({ messages }) => {
  return (
    <div className="w-full flex flex-col pr-5 pl-5 flex-1 overflow-auto gap-2 min-h-[300px]">
      {messages.map((message: IMessage) => {
        return (
          <Message key={message.id} {...message} />
        )
      })}

    </div>
  )
}

export default ChatContent;