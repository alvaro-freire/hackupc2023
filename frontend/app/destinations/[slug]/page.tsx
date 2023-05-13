'use client'

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

import StarRating from '@/components/molecules/starRating';

import { mockSingleDestination } from '@/migrations/destination.data';
import { IPointOfInterest } from '@/types/destination.types';

import { trimToLength } from '@/common/stringUtils';

const { pointsOfInterest } = mockSingleDestination;

const Destination: React.FC = () => {
  const [currentPointOfInterestIndex, setCurrentPointOfInterestIndex] = useState<number>(-1);


  const currentPointOfInterest: IPointOfInterest | undefined = useMemo(() => {
    if (pointsOfInterest && pointsOfInterest[currentPointOfInterestIndex]) {
      return pointsOfInterest[currentPointOfInterestIndex];
    }

    return;
  }, [currentPointOfInterestIndex]);

  const handleMoveNextPoint = () => {
    if (currentPointOfInterestIndex === pointsOfInterest.length - 1) { return; }
    setCurrentPointOfInterestIndex((prev) => { return prev + 1; });
  }

  const handleMovePreviousPoint = () => {
    if (currentPointOfInterestIndex === 0) { return; }
    setCurrentPointOfInterestIndex((prev) => { return prev - 1; });
  }

  useEffect(() => {
    if (pointsOfInterest && pointsOfInterest.length >= 1) {
      setCurrentPointOfInterestIndex(0);
    }
  }, []);


  if (!currentPointOfInterest) { return (<></>); }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden relative w-full h-70">
        <button
          className="absolute left-0 w-[50%] h-full outline-none border-none pointer flex justify-end items-center rotate-180"
          onClick={handleMovePreviousPoint}
        >
          <Image
            src="/icons/arrowForward.svg"
            height={70}
            width={70}
            alt="arrow-back-icon"
          />
        </button>
        <button
          className="absolute right-0 w-[50%] h-full outline-none border-none pointer flex justify-end items-center"
          onClick={handleMoveNextPoint}
        >
          <Image
            src="/icons/arrowForward.svg"
            height={70}
            width={70}
            alt="arrow-forward-icon"
          />

        </button>
        <Image
          src={currentPointOfInterest.landingImage}
          height={10000}
          width={10000}
          alt={`${currentPointOfInterest.name}_landing`}
        />
      </div>
      <h2 className="text-justify text-3xl pr-4 pl-4 "> {trimToLength(currentPointOfInterest.name, 25)}</h2>
      <p className="text-justify pr-4 pl-4 "> {trimToLength(currentPointOfInterest.description, 125)}</p>

      <StarRating />
    </div>
  );
}
export default Destination;
