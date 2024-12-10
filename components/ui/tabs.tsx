'use client';

import React, { useState } from 'react';

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

type TabsChildProps = TabsListProps | TabsTriggerProps | TabsContentProps;

function Tabs({ children, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || '');

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<TabsChildProps>(child)) return null;

        return React.cloneElement(child, {
          activeTab,
          setActiveTab,
        } as Partial<TabsChildProps>);
      })}
    </div>
  );
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

function TabsList({ children }: TabsListProps) {
  return <div className="inline-flex h-10 items-center">{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

function TabsTrigger({ value, children, activeTab, setActiveTab }: TabsTriggerProps) {
  const isActive = value === activeTab;
  return (
    <button
      className={`px-4 py-2 text-sm font-medium ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      onClick={() => setActiveTab && setActiveTab(value)}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

function TabsContent({ value, children, activeTab }: TabsContentProps) {
  if (value !== activeTab) return null;

  return <div className="mt-4">{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
