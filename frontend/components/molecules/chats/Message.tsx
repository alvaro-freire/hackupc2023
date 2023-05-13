'use client'

import React, { useMemo } from 'react';
import { IMessage, IAuthor } from '@/types/chat.types';

const mockCurrentUser: string = '1';

const leftBubble = (content: string, author: IAuthor): React.ReactElement => {
  if (!content) { return (<></>); }
  return (
    <div className="w-full flex justify-start">
      <div className="w-80 rounded-2xl rounded-tl-none p-3 bg-accent">
        {content}
      </div>
    </div>
  );
};

const rightBubble = (content: string, author: IAuthor): React.ReactElement => {
  if (!content) { return (<></>); }
  return (
    <div className="w-full flex justify-end">
      <div className="w-80 rounded-2xl rounded-tr-none p-3 bg-primary">
        {content}
      </div>
    </div>
  );
};

const Message: React.FC<IMessage> = ({ author, content }) => {
  const isHostUser = useMemo(() => {
    if (mockCurrentUser != author.userId) {
      return false;
    }

    return true;

  }, [mockCurrentUser]);

  return (
    <>
      {isHostUser ? rightBubble(content, author) : leftBubble(content, author)}
    </>
  );
}

export default Message;
