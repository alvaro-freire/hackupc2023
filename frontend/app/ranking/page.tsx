'use client'

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Image from 'next/image';

import { Rank } from '@/types/ranking.types';
import useCredentials from '@/hooks/useCredentials';

const Ranking: React.FC = () => {
  const credentials = useCredentials();
  const [ranking, setRanking] = useState([]);

  const getRanking = useCallback(async (token: string) => {
    try {
      const response = await fetch('http://localhost:8080/quiz/leaderboard', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        setRanking([]);
      }
      const json = await response.json();
      setRanking(() => json);
    } catch {
      setRanking([]);
    }
  }, []);

  useEffect(() => {
    if (credentials.token) {
      getRanking(credentials.token);
    }
  }, [getRanking, credentials.token]);

  const currentPosition = useMemo(() => {
    if (credentials.nickname) {
      const index = ranking.findIndex((rank: Rank) => rank.nickname === credentials.nickname);
      return index + 1;
    }

  }, [credentials.nickname, ranking]);

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex w-full justify-center items-center gap-1">
        <Image src="/icons/leaderboard.svg" height={30} width={30} alt="leaderboard_icon" />
        <span className="text-3xl">
          {currentPosition}
        </span>
      </div>
      <div className="flex-1 mt-5 w-72 sm:w-96 overflow-auto mx-auto">
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
            {ranking.map((rank: Rank) => {
              return (
                <tr key={rank.nickname} className="border-b-2 border-primary border-solid">
                  <td className="p-2">
                    <span className="flex items-center justify-start gap-2">
                      {rank.nickname === credentials.nickname
                        ? (<strong>{rank.nickname}</strong>)
                        : rank.nickname
                      }
                    </span>
                  </td>
                  <td className="p-2">
                    <span className="flex items-center justify-center gap-2">
                      {rank.nickname === credentials.nickname
                        ? (<strong>{rank.points}</strong>)
                        : rank.points
                      }
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
