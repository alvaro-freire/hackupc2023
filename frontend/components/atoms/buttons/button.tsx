import React from 'react';

interface IProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<IProps> = ({ text, onClick }) => {
  return (
    <button
      className="w-full h-full p-2 outline-none border-none rounded-lg bg-yellow-400 active:bg-yellow-200 ease-in duration-100 transition text-white"
      onClick={() => { onClick?.() }}
    >
      {text}
    </button>
  );
}

export default Button;
