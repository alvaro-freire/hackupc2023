'use client'

import React from 'react';
import Image from 'next/image';

interface IProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

const MessageBox: React.FC<IProps> = ({ onChange, value }) => {
  return (
    <div className="flex outline-3 outline-yellow-300 outline rounded-full px-4 items-center">
      <textarea
        className="w-full h-auto resize-none flex-1 outline-none"
        rows={1}
        onChange={(e) => { onChange?.(e) }}
        value={value}
      ></textarea>
      <Image src="/icons/send.svg" height={40} width={40} alt="logo_vueling" />

    </div>
  );
}

export default MessageBox;
