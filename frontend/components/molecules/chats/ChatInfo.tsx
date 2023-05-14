import React from 'react';
import Image from 'next/image';

import { IIndividualChatInfo } from '@/types/chat.types';

interface IProps extends IIndividualChatInfo {
  children?: React.ReactNode;
  isHidden?: boolean;
}

const ChatInfo: React.FC<IProps> = ({ user, children, isHidden = false }) => {

  return (
    <div className="flex flex-row w-full">
      <div className="flex-1 p-2">
        <span className="text-sm"> Talking to: </span>
        <div className={`flex justify-content-center gap-1 ${isHidden ? 'blur-sm' : ''} transition ease-out`}>
          <Image src="/icons/user-solid.svg" height={15} width={13} alt="user_icon" />
          <span>
            {user.username.length > 15
              ? `${user.username.slice(0, 15)}...`
              : user.username
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
      {children}
    </div>
  );
};

export default ChatInfo;
