'use client';

import React, { 
  useState, 
  useRef, 
  useEffect, 
  ReactNode, 
  HTMLAttributes, 
  ReactElement 
} from 'react';
import { ChevronRight, Check, Circle } from 'lucide-react';

interface DropdownMenuProps {
  children: ReactNode;
}

interface DropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
  disabled?: boolean;
}

interface SubMenuProps {
  label: string;
  children: ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {React.Children.map(children, child => 
        React.cloneElement(child as ReactElement, { 
          toggleDropdown, 
          isOpen 
        })
      )}
    </div>
  );
};

const DropdownMenuTrigger: React.FC<{
  children: ReactNode;
  toggleDropdown?: () => void;
}> = ({ children, toggleDropdown }) => (
  <button 
    onClick={toggleDropdown} 
    className="flex items-center"
  >
    {children}
  </button>
);

const DropdownMenuContent: React.FC<{
  children: ReactNode;
  isOpen?: boolean;
}> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 min-w-[8rem] rounded-md border bg-white shadow-lg p-1 mt-1">
      {children}
    </div>
  );
};

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ 
  children, 
  className = '', 
  inset, 
  disabled, 
  ...props 
}) => (
  <div
    className={`
      relative flex cursor-default select-none items-center 
      rounded-sm px-2 py-1.5 text-sm outline-none 
      transition-colors hover:bg-gray-100
      ${inset ? 'pl-8' : ''}
      ${disabled ? 'opacity-50 pointer-events-none' : ''}
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

const DropdownMenuLabel: React.FC<DropdownMenuItemProps> = ({ 
  children, 
  className = '', 
  inset, 
  ...props 
}) => (
  <div
    className={`
      px-2 py-1.5 text-sm font-semibold text-gray-500
      ${inset ? 'pl-8' : ''}
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

const DropdownMenuSeparator: React.FC = () => (
  <div className="-mx-1 my-1 h-px bg-gray-200" />
);

const DropdownMenuSubTrigger: React.FC<DropdownMenuItemProps & SubMenuProps> = ({ 
  label, 
  children, 
  inset 
}) => {
  const [isSubOpen, setIsSubOpen] = useState(false);

  return (
    <div 
      className={`
        relative flex cursor-default select-none items-center 
        rounded-sm px-2 py-1.5 text-sm outline-none 
        hover:bg-gray-100
        ${inset ? 'pl-8' : ''}
      `}
      onMouseEnter={() => setIsSubOpen(true)}
      onMouseLeave={() => setIsSubOpen(false)}
    >
      {label}
      <ChevronRight className="ml-auto h-4 w-4" />
      {isSubOpen && (
        <div className="absolute left-full top-0 min-w-[8rem] rounded-md border bg-white shadow-lg p-1">
          {children}
        </div>
      )}
    </div>
  );
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger
};