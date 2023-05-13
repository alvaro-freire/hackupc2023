import React from 'react';
import Image from 'next/image';

import { IPointOfInterest } from '@/types/destination.types';

const InterestPoint: React.FC<IPointOfInterest> = ({ name, landingImage }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl relative drop-shadow-md">
      <Image
        src={landingImage}
        height={500}
        width={500}
        alt={`${name}_landing`}
        style={{ objectFit: "cover" }}
      />

      <h2 className="absolute text-3xl bottom-0 text-gray p-2 bg-white w-full"> {name} </h2>

    </div>
  );

}

export default InterestPoint;
