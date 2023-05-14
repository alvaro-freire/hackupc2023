'use client'
import React from 'react';

type optionType = { text: string, value: string };

interface IProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  value?: string;
  label?: string;
  labelFor?: string;
  options: Array<optionType>;
}

const SelectInput: React.FC<IProps> = ({
  className,
  onChange,
  value,
  label,
  labelFor,
  options
}) => {
  if (options.length === 0) { return (<></>); }
  return (
    <div className="flex flex-col items-start w-full">
      {label && labelFor && (
        <label htmlFor={labelFor} className="text-xl"> {label} </label>
      )}
      <select
        className={`w-full mt-2 border-none outline-none outline-solid outline-2 outline-primary rounded-sm p-2 bg-white ${className}`}
        onChange={(e) => { onChange?.(e); }}
        value={value || ''}
        id={labelFor ? labelFor : ''}
      >
        {options.map((option: optionType) => {
          return (
            <option className="bg-white" value={option.value} key={option.value}>
              {option.text}
            </option>
          )
        })}
      </select>
    </div>
  );
};

export default SelectInput;
