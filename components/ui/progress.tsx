'use client';

import React, { HTMLAttributes } from 'react';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress: React.FC<ProgressProps> = ({ 
  className = '', 
  value = 0, 
  ...props 
}) => {
  return (
    <div
      className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
      {...props}
    >
      <div 
        className="h-full bg-blue-500 transition-all" 
        style={{ 
          width: `${value}%`, 
          transition: 'width 0.5s ease-in-out' 
        }}
      />
    </div>
  );
};

export { Progress };