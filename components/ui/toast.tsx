'use client';

import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface ToastProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'info';
}

const ToastComponent: React.FC<ToastProps> = ({
  title,
  description,
  action,
  variant = 'default',
}) => {
  const variantStyles: Record<string, string> = {
    default: 'bg-gray-800 text-white',
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  const className = [
    'flex items-center p-4 rounded shadow-lg',
    variantStyles[variant],
    'transition-all duration-300 ease-in-out',
    'animate-slide-in-right'
  ].join(' ');

  return (
    <div className={className}>
      <div className="grid gap-1 flex-grow">
        {title && <div className="font-bold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {action && <div className="ml-4">{action}</div>}
      <button 
        className="ml-2 text-lg font-bold opacity-70 hover:opacity-100"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} {...toast} />
        ))}
      </div>
    </>
  );
};

export {
  ToastComponent as Toast,
  Provider as ToastProvider,
  useToast
};