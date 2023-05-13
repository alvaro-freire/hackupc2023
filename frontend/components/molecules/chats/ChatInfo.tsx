'use client'

import React, { useState } from 'react';
import Image from 'next/image';

import { IIndividualChatInfo } from '@/types/chat.types';
import Button from '@/components/atoms/buttons/button';

const ChatInfo: React.FC<IIndividualChatInfo> = ({ name, user }) => {
  const [isHidden, setHidden] = useState<boolean>(true);

  return (
    <div className="flex flex-row w-full">
      <div className="flex-1 p-2">
        <span className="text-sm"> Talking to: </span>
        <div className={`flex justify-content-center gap-1 ${isHidden ? 'blur-sm' : ''} transition ease-out`}>
          <Image src="/icons/user-solid.svg" height={15} width={13} alt="user_icon" />
          <span>
            {name.length > 15
              ? `${name.slice(0, 15)}...`
              : name
            }
          </span>
        </div>
        <div className={`flex justify-content-center gap-1 ${isHidden ? 'blur-sm' : ''} transition ease-out`}>
          <Image src="/icons/seat.svg" height={15} width={13} alt="user_icon" />
          <span>
            {user.seat}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-100 h-100 flex-1 p-2 ">
        <Button text="Next" />
        <Button text="Show" onClick={() => { setHidden(!isHidden); }} />
      </div>
    </div>
  );
};

export default ChatInfo;
