'use client'

import React from 'react';
import Image from 'next/image';

interface IProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend?: () => void;
  value?: string;
}

const MessageBox: React.FC<IProps> = ({ onChange, value, onSend }) => {
  return (
    <div className="flex outline-3 outline-primary outline rounded-full px-4 items-center">
      <textarea
        className="w-full h-auto resize-none flex-1 outline-none"
        rows={1}
        onChange={(e) => { onChange?.(e) }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSend?.();
          }
        }}
        value={value}
      ></textarea>
      <button
        className="outline-none border-none pointer"
        onClick={() => { onSend?.(); }}
      >
        <Image src="/icons/send.svg" height={40} width={40} alt="logo_vueling" />
      </button>

    </div >
  );
}

export default MessageBox;
