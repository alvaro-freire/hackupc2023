import React from 'react';

import HeroHeader from '@/components/atoms/typography/HeroHeader';
import Subheading from '@/components/atoms/typography/Subheading';
import TransportForm from '@/components/molecules/transport/Form';

const Transport: React.FC = () => {
  return (
    <div className="flex flex-col pl-10 pr-10 items-center justify-center text-center">
      <HeroHeader>
        Where are you going after the airport?
      </HeroHeader>
      <Subheading className="pt-3">
        Share your ride, save money!
      </Subheading>

      <TransportForm />
    </div>
  );
}

export default Transport;
