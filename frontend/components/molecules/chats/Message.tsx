'use client'

import React, { useMemo } from 'react';
import { IMessage, IAuthor } from '@/types/chat.types';

import useCredentials from '@/hooks/useCredentials';

const leftBubble = (content: string, author: IAuthor): React.ReactElement => {
  if (!content) { return (<></>); }
  return (
    <div className="w-full flex flex-col justify-end w-80 rounded-2xl rounded-tl-none p-3 bg-accent">
      <span className="text-sm"> {author.username}{author.seat ? ` (${author.seat}) ` : ''}</span>
      <div className="">
        {content}
      </div>
    </div>
  );
};

const rightBubble = (content: string, author: IAuthor): React.ReactElement => {
  if (!content) { return (<></>); }
  return (
    <div className="w-full flex flex-col justify-end w-80 rounded-2xl rounded-tr-none p-3 bg-primary">
      <span className="text-sm"> {author.username}{author.seat ? ` (${author.seat}) ` : ''}</span>
      <div>
        {content}
      </div>
    </div>
  );
};

const Message: React.FC<IMessage> = ({ author, content }) => {
  const { seat } = useCredentials();
  const isHostUser = useMemo(() => {
    if (seat != author.seat) {
      return false;
    }

    return true;

  }, [seat]);

  return (
    <>
      {isHostUser ? rightBubble(content, author) : leftBubble(content, author)}
    </>
  );
}

export default Message;
