import React from 'react';
import Message from './Message';

import { IMessage } from '@/types/chat.types';

interface IProps {
  messages: Array<IMessage | string>
}


const ChatContent: React.FC<IProps> = ({ messages }) => {
  return (
    <div className="w-full mb-2 flex flex-col pr-5 pl-5 flex-1 overflow-auto gap-2 min-h-[300px] h-[300px]">
      {messages.map((message: IMessage | string) => {
        return (
          <>
            {typeof message === 'string'
              ? (<div>{message}</div>)
              : (<Message key={message.id} {...message} />)
            }
          </>
        )
      })}

    </div>
  )
}

export default ChatContent;
