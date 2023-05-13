import React, { useMemo } from 'react';
import Image from 'next/image';

import { ITransportChatInfo } from '@/types/chat.types';
import { transportMethods } from '@/types/transport.types';

const TransportChatInfo: React.FC<ITransportChatInfo> = ({ method, destination }) => {
  const methodText: string = useMemo(() => {
    if (!method) { return ''; }
    const foundMethod = transportMethods.find((me) => me.value === method);

    if (!foundMethod) { return ''; }
    return foundMethod.text;
  }, []);

  return (
    <div className="flex flex-row w-full">
      <div className="flex-1 p-2">
        <span className="text-sm"> Chat for: </span>
        <div className="flex justify-content-center gap-1 transition ease-out">
          <Image src="/icons/locationMarker.svg" height={18} width={18} alt="location_icon" />
          <span>
            {destination.length > 15
              ? `${destination.slice(0, 15)}...`
              : destination
            }
          </span>
        </div>
        <div className="flex justify-content-center gap-1 transition ease-out">
          <Image src="/icons/car.svg" height={18} width={18} alt="car_icon" />
          <span>
            {methodText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransportChatInfo;
