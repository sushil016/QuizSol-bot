'use client';

import * as React from 'react';

interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
}

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, onValueChange, defaultValue, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`grid gap-2 ${className}`}
        role="radiogroup"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement<RadioGroupItemProps>(child)) {
            return React.cloneElement(child, {
              checked: child.props.value === value,
              onCheckedChange: () => onValueChange(child.props.value),
            } as Partial<RadioGroupItemProps>);
          }
          return child;
        })}
      </div>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps {
  value: string;
  checked?: boolean;
  onCheckedChange?: () => void;
  className?: string;
  id?: string;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ value, checked, onCheckedChange, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={checked}
        onClick={onCheckedChange}
        className={`aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
          checked ? 'bg-primary' : ''
        } ${className}`}
        {...props}
      >
        {checked && (
          <span className="flex h-full w-full items-center justify-center">
            <span className="h-2.5 w-2.5 rounded-full bg-current" />
          </span>
        )}
      </button>
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
