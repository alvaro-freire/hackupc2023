export interface IAuthor {
  username: string;
  userId: string;
  seat: number;
  seatLetter: string;
}

export interface IIndividualChatInfo {
  id: string;
  name: string;
  user: IAuthor;
}

export interface ITransportChatInfo {
  id: string;
  destination: string;
  method: string;
}

export interface IMessage {
  id: string;
  author: IAuthor;
  content: string;
}
