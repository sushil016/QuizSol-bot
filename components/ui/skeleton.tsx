'use client';

import * as React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-300 ${className}`}
      {...props}
    />
  );
}

export { Skeleton };
