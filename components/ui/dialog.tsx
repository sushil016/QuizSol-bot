'use client';

import * as React from 'react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center "
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative z-50 w-full max-w-lg  p-6 shadow-lg sm:rounded-lg"
        role="document"
      >
        {children}
        <button
          className="absolute right-4 top-4 rounded-full p-1"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
        >
          ✕ 
        </button>
      </div>
      <div
        className="absolute inset-0 z-40"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      ></div>
    </div>
  );
};

const DialogTrigger: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button onClick={onClick} className="btn">
    {children}
  </button>
);

const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={`text-lg font-semibold ${className}`} {...props} />
);

const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={`flex justify-end space-x-2 ${className}`} {...props} />
);

const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h2 className={`text-lg font-bold ${className}`} {...props} />
);

const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props} />
);

const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={`relative z-50 w-full max-w-lg bg-white p-6 shadow-lg sm:rounded-lg ${className}`} {...props} />
);

export {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogContent,
};
