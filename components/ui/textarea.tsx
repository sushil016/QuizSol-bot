import * as React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
