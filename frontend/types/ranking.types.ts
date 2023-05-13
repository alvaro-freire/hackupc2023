export interface Rank {
  userId: string;
  username: string;
  score: number;
}

export type Ranking = Array<Rank>;
