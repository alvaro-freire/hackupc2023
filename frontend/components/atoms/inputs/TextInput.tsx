'use client'

import React from 'react';

interface IProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  label?: string;
  labelFor?: string;
}

const TextInput: React.FC<IProps> = ({ className, onChange, value, label, labelFor }) => {
  return (
    <div className="flex flex-col items-start w-full">
      {label && labelFor && (
        <label htmlFor={labelFor} className="text-xl"> {label} </label>
      )}
      <input
        className={`w-full border-none outline-none outline-solid outline-2 outline-primary rounded-sm p-2 ${className}`}
        onChange={(e) => { onChange?.(e); }}
        value={value || ''}
        id={labelFor ? labelFor : ''}
      />
    </div>
  );
}

export default TextInput;

