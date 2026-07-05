'use client';

import React from 'react';

export interface DemoButtonProps {
  message: string;
  className?: string;
  children: React.ReactNode;
}

export const DemoButton: React.FC<DemoButtonProps> = ({ message, className, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert(message);
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};
