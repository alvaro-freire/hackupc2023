import { IAuthor, IIndividualChatInfo, IMessage } from '@/types/chat.types';
export const defAuthor: IAuthor = {
  username: 'uriel',
  userId: '2',
  seat: 25,
  seatLetter: 'F'
};

export const defOrigin: IAuthor = {
  username: 'uriel',
  userId: '1',
  seat: 25,
  seatLetter: 'F'
};

export const mockChatInfo: IIndividualChatInfo = {
  id: '123123123',
  name: 'new Chat',
  user: defAuthor
};



export const mockMessages: Array<IMessage> = [
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
