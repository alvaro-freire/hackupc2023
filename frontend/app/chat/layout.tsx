import React from 'react';

interface IProps {
  children: React.ReactNode
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (<>{children}</>);
}

export default Layout;
