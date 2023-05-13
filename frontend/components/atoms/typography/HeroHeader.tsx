import React from 'react';

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const HeroHeader: React.FC<IProps> = ({ children, className }) => {
  return (
    <h1 className={`text-2xl ${className || ''}`}>
      {children}
    </h1>
  );
}

export default HeroHeader;
