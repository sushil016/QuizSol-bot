import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '', ...props }: CardProps) => (
  <div 
    className={`rounded-lg border bg-background text-muted-foreground shadow-sm ${className}`} 
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }: CardProps) => (
  <div 
    className={`flex flex-col space-y-1.5 p-6 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  className?: string;
}) => (
  <h3 
    className={`text-2xl font-semibold leading-none tracking-tight  ${className}`} 
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
  className?: string;
}) => (
  <p 
    className={`text-sm  ${className}`} 
    {...props}
  >
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }: CardProps) => (
  <div 
    className={`p-6 pt-0 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }: CardProps) => (
  <div 
    className={`flex items-center p-6 pt-0 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };