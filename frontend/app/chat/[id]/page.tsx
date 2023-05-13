import React from 'react';
import MainHeader from '@/components/atoms/typography/MainHeader';
import ChatInfo from '@/components/molecules/ChatInfo';
import ChatContent from '@/components/molecules/ChatContent';
import MessageBox from '@/components/molecules/MessageBox';

import { IIndividualChatInfo, IMessage, IAuthor } from '@/types/chat.types';

interface IProps {
  params: { id: string }
}

const defAuthor: IAuthor = {
  username: 'uriel',
  userId: '2',
  seat: 25,
  seatLetter: 'F'
};

const defOrigin: IAuthor = {
  username: 'uriel',
  userId: '1',
  seat: 25,
  seatLetter: 'F'
};

const mockChatInfo: IIndividualChatInfo = {
  id: '123123123',
  name: 'new Chat',
  user: defAuthor
};



const mockMessages: Array<IMessage> = [
  {
    id: '1',
    author: defAuthor,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
  },
  {
    id: '2',
    author: defAuthor,
    content: 'Lorem ipsum dolor '
  },
  {
    id: '3',
    author: defOrigin,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum bibendum placerat. Pellentesque euismod odio bibendum, commodo elit sed, vestibulum lacus. Duis laoreet sagittis elit, gravida venenatis nulla euismod eu. Sed cursus mauris placerat lacus lacinia, non ornare elit ultricies. Sed non eros gravida lacus pretium malesuada. '
  },
  {
    id: '4',
    author: defAuthor,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum bibendum placerat. Pellentesque euismod odio bibendum, commodo elit sed, vestibulum lacus. Duis laoreet sagittis elit, gravida venenatis nulla euismod eu. Sed cursus mauris placerat lacus lacinia, non ornare elit ultricies. Sed non eros gravida lacus pretium malesuada. '
  }
]

const Chat: React.FC<IProps> = () => {
  return (
    <div className="h-full flex flex-col gap-2 pr-4 pl-4 pb-5 ">
      <MainHeader />
      <ChatInfo {...mockChatInfo} />
      <ChatContent messages={mockMessages} />
      <MessageBox />
    </div>
  );
}

export default Chat;
