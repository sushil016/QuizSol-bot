'use client';

import * as React from 'react';

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={decorative ? undefined : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        className={`shrink-0 bg-gray-300 ${
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'
        } ${className}`}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator };
