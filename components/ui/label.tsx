import * as React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => {
    // Base styles mimicking the original label
    const baseStyles: React.CSSProperties = {
      fontSize: '0.875rem', // text-sm
      fontWeight: 500, // font-medium
      lineHeight: 'none',
      cursor: 'pointer',
      color: '#333' // default text color
    };

    // Styles for disabled state
    const disabledStyles: React.CSSProperties = {
      cursor: 'not-allowed',
      opacity: 0.7
    };

    // Merge base styles with additional styles
    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...(props.disabled ? disabledStyles : {}),
      ...(className ? parseStyles(className) : {})
    };

    return (
      <label
        ref={ref}
        style={combinedStyles}
        {...props}
      >
        {children}
      </label>
    );
  }
);

// Utility function to parse className-like string to styles
function parseStyles(className: string): React.CSSProperties {
  const styleMap: {[key: string]: React.CSSProperties} = {
    'text-red-500': { color: '#ef4444' },
    'text-blue-500': { color: '#3b82f6' },
    'text-green-500': { color: '#22c55e' },
    // Add more custom class to style mappings as needed
  };

  return className.split(' ').reduce((acc, cls) => {
    return { ...acc, ...(styleMap[cls] || {}) };
  }, {});
}

Label.displayName = 'Label';

export { Label };