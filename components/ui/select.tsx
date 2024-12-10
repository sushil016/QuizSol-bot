'use client';

import * as React from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectItemProps {
  value: string;
  isSelected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onValueChange, children, className = '', ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <div ref={ref} className={`relative ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder, className = '', ...props }, ref) => (
    <span ref={ref} className={className} {...props}>
      {placeholder}
    </span>
  )
);

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`absolute z-10 mt-2 w-full rounded-md border bg-white shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, isSelected, onClick, children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      onClick={onClick}
      className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${
        isSelected ? 'bg-gray-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

Select.displayName = 'Select';
SelectTrigger.displayName = 'SelectTrigger';
SelectValue.displayName = 'SelectValue';
SelectContent.displayName = 'SelectContent';
SelectItem.displayName = 'SelectItem';

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};
