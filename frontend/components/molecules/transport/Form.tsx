'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useCredentials from '@/hooks/useCredentials';

import { transportMethods } from '@/types/transport.types';
import TextInput from '@/components/atoms/inputs/TextInput';
import SelectInput from '@/components/atoms/inputs/SelectInput';
import Button from '@/components/atoms/buttons/button';

const Form: React.FC = () => {
  const [destination, setDestination] = useState<string>('');
  const [method, setMethod] = useState<string>(transportMethods[0].value);
  const [methodOptions, setMethodOptions] = useState<Array<{ text: string, value: string }>>([]);
  const [locationOptions, setLocationOptions] = useState<Array<{ text: string, value: string }>>([]);
  const { token } = useCredentials();

  const getData = async () => {
    const response = await fetch('http://localhost:8080/transport', {
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      return;
    }
    const json = await response.json();
    const { methods, locations } = json;
    setMethodOptions(() => methods.map((method: string) => ({ text: method, value: method })));
    setLocationOptions(() => locations.map((location: string) => ({ text: location, value: location })));
  }

  const router = useRouter();

  const handleChangeDestinationInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { value } = e.target;

    setDestination(value);
  };

  const handleChangeMethodInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { value } = e.target;

    setMethod(value);
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {

      const response = await fetch('http://localhost:8080/transport', {
        method: 'POST',
        body: JSON.stringify({
          location: destination,
          method
        }),
        headers: {
          'authorization': `bearer ${token}`
        }
      });

      if (!response.ok) { throw new Error(); }

      const json = await response.json();

      const { room: roomId } = json;

      if (!roomId) { throw new Error(); }

      router.push(`/transport/${roomId}?destination=${destination}&method=${method}`);

    } catch {
      console.log('Error on request');
    }
  };

  useEffect(() => {
    getData();
  }, [])

  return (
    <form className="pt-4 flex w-64 sm:w-96 gap-4 flex-col" onSubmit={(e) => { handleSubmit(e) }}>
      <SelectInput
        value={destination}
        onChange={handleChangeDestinationInput}
        label="Destinations"
        labelFor="destination-input"
        options={locationOptions}
      />
      <SelectInput
        value={method}
        onChange={handleChangeMethodInput}
        label="Method"
        labelFor="method-input"
        options={methodOptions}
      />
      <div className="mt-2" />
      <Button
        text='Go Chat !'
      />
    </form>
  );
}

export default Form;
