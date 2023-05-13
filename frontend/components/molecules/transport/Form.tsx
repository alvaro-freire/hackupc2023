'use client'

import React, { useState } from 'react';

import { transportMethods } from '@/types/transport.types';
import TextInput from '@/components/atoms/inputs/TextInput';
import SelectInput from '@/components/atoms/inputs/SelectInput';
import Button from '@/components/atoms/buttons/button';

const Form: React.FC = () => {
  const [destination, setDestination] = useState<string>('');
  const [method, setMethod] = useState<string>(transportMethods[0].value);

  const handleChangeDestinationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setDestination(value);
  };

  const handleChangeMethodInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { value } = e.target;

    setMethod(value);
  }

  return (
    <form
      className="pt-4 flex w-full gap-4 flex-col"
      onSubmit={(e) => { e.preventDefault(); }}
    >
      <TextInput
        value={destination}
        onChange={handleChangeDestinationInput}
        label="Destination"
        labelFor="destination-input"
      />

      <SelectInput
        value={method}
        onChange={handleChangeMethodInput}
        label="Method"
        labelFor="method-input"
        options={transportMethods}
      />

      <Button
        text='Go Chat !'
      />

    </form>
  );
}

export default Form;
