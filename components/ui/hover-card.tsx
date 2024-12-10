'use client';

import React, { 
  useState, 
  useRef, 
  useEffect, 
  ReactNode, 
  HTMLAttributes 
} from 'react';

type Alignment = 'start' | 'center' | 'end';
type Side = 'top' | 'bottom' | 'left' | 'right';

interface HoverCardProps {
  children: ReactNode;
}

interface HoverCardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  align?: Alignment;
  side?: Side;
  sideOffset?: number;
}

const HoverCard: React.FC<HoverCardProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {React.Children.map(children, child => 
        React.cloneElement(child as React.ReactElement, { 
          isOpen, 
          setIsOpen 
        })
      )}
    </div>
  );
};

const HoverCardTrigger: React.FC<HTMLAttributes<HTMLDivElement> & { 
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ 
  children, 
  isOpen, 
  setIsOpen, 
  ...props 
}) => (
  <div
    onMouseEnter={() => setIsOpen?.(true)}
    onMouseLeave={() => setIsOpen?.(false)}
    {...props}
  >
    {children}
  </div>
);

const HoverCardContent: React.FC<HoverCardContentProps & { 
  isOpen?: boolean;
}> = ({ 
  children, 
  isOpen, 
  className = '',
  align = 'center',
  side = 'bottom',
  sideOffset = 4,
  ...props 
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const getPositionStyles = () => {
    const baseStyles = 'absolute z-50 w-64 rounded-md border bg-white p-4 shadow-md';
    const alignmentStyles = {
      start: 'left-0',
      center: 'left-1/2 transform -translate-x-1/2',
      end: 'right-0'
    };
    const sideStyles = {
      top: `bottom-full mb-${sideOffset}`,
      bottom: `top-full mt-${sideOffset}`,
      left: `right-full mr-${sideOffset}`,
      right: `left-full ml-${sideOffset}`
    };

    return `${baseStyles} ${alignmentStyles[align]} ${sideStyles[side]}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={contentRef}
      className={`${getPositionStyles()} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { 
  HoverCard, 
  HoverCardTrigger, 
  HoverCardContent 
};