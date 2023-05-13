'use client'

import React, { useMemo } from 'react';
import Image from 'next/image';

import { mockRanking } from '@/migrations/ranking.data';
import { Rank } from '@/types/ranking.types';

const currentUserId: string = '1';

const Ranking = () => {
  const currentPosition = useMemo(() => {
    const rank: number = mockRanking.findIndex((el: Rank) => el.userid === currentUserId);

    if (rank < 0) { return 0; }
    return rank + 1;

  }, [])

  const sortedRanks: Array<Rank> = useMemo(() => {
    return mockRanking.sort((a, b) => {
      if (a.score > b.score) { return -1; }
      if (a.score < b.score) { return 1; }
      return 0;
    });
  }, []);

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex w-full justify-center items-center gap-1">
        <Image src="/icons/leaderboard.svg" height={30} width={30} alt="leaderboard_icon" />
        <span className="text-3xl">
          {currentPosition}
        </span>
      </div>
      <div className="flex-1 w-full mt-5 overflow-auto px-5">
        <table className="w-full">
          <thead>
            <tr >
              <th className="p-2">
                <span className="flex items-center justify-start gap-2">
                  <Image src="/icons/user-solid.svg" height={20} width={20} alt="leaderboard_user_icon" />
                  Nickname
                </span>
              </th>
              <th className="p-2">
                <span className="flex items-center justify-center gap-2">
                  <Image src="/icons/star.svg" height={20} width={20} alt="leaderboard_star_icon" />
                  Points
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRanks.map((rank: Rank) => {
              return (
                <tr key={rank.userid} className="border-b-2 border-primary border-solid">
                  <td className="p-2">
                    <span className="flex items-center justify-start gap-2">
                      {rank.username}
                    </span>
                  </td>
                  <td className="p-2">
                    <span className="flex items-center justify-center gap-2">
                      {rank.score}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default Ranking;
