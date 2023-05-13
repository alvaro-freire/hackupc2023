import React from 'react';

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const Subheading: React.FC<IProps> = ({ children, className }) => {
  return (
    <h2 className={`text-xl ${className || ''}`}>
      {children}
    </h2>
  )
}

export default Subheading;
