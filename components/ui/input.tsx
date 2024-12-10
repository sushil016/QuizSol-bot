import * as React from 'react';

export interface InputProps 
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // Base styles that mimic the original shadcn input
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      height: '2.5rem', // equivalent to h-10
      width: '100%',
      borderRadius: '0.375rem', // rounded-md
      border: '1px solid #d1d5db', // border-input
   // bg-background
      paddingLeft: '0.75rem', // px-3
      paddingRight: '0.75rem',
      paddingTop: '0.5rem', // py-2
      paddingBottom: '0.5rem',
      fontSize: '0.875rem', // text-sm
      outline: 'none'
    };

    // Styles for different states
    const hoverStyles: React.CSSProperties = {
      borderColor: '#9ca3af'
    };

    const focusStyles: React.CSSProperties = {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)' // ring effect
    };

    const disabledStyles: React.CSSProperties = {
      cursor: 'not-allowed',
      opacity: 0.5
    };

    // Merge base styles with any additional className styles
    const combinedStyles = {
      ...baseStyles,
      ...(props.disabled ? disabledStyles : {}),
      ...(className ? parseStyles(className) : {})
    };

    return (
      <input
        type={type}
        style={combinedStyles}
        ref={ref}
        {...props}
      />
    );
  }
);

// Utility function to parse className-like string to styles
function parseStyles(className: string): React.CSSProperties {
  const styleMap: {[key: string]: React.CSSProperties} = {
    'text-red-500': { color: '#ef4444' },
    
    // Add more custom class to style mappings as needed
  };

  return className.split(' ').reduce((acc, cls) => {
    return { ...acc, ...(styleMap[cls] || {}) };
  }, {});
}

Input.displayName = 'Input';

export { Input };