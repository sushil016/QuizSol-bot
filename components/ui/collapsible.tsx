'use client';

import React, { 
  useState, 
  ReactNode, 
  HTMLAttributes 
} from 'react';

interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  defaultOpen?: boolean;
}

interface CollapsibleTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ 
  children, 
  defaultOpen = false, 
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div {...props}>
      {React.Children.map(children, child => 
        React.cloneElement(child as React.ReactElement, { 
          isOpen, 
          toggleOpen 
        })
      )}
    </div>
  );
};

const CollapsibleTrigger: React.FC<CollapsibleTriggerProps & { 
  isOpen?: boolean; 
  toggleOpen?: () => void 
}> = ({ 
  children, 
  isOpen, 
  toggleOpen, 
  ...props 
}) => (
  <button 
    onClick={toggleOpen} 
    aria-expanded={isOpen}
    className="w-full text-left flex items-center justify-between"
    {...props}
  >
    {children}
    <span>{isOpen ? '▼' : '►'}</span>
  </button>
);

const CollapsibleContent: React.FC<CollapsibleContentProps & { 
  isOpen?: boolean 
}> = ({ 
  children, 
  isOpen, 
  ...props 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="transition-all duration-300 ease-in-out" 
      {...props}
    >
      {children}
    </div>
  );
};

export { 
  Collapsible, 
  CollapsibleTrigger, 
  CollapsibleContent 
};