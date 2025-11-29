import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, subtitle, children, className = '' }: CardProps) {
  // Check if custom padding is provided
  const hasPadding = /\bp-\d|px-\d|py-\d|pt-\d|pb-\d|pl-\d|pr-\d|sm:p-|md:p-|lg:p-/.test(className);
  const defaultPadding = hasPadding ? '' : 'p-4 sm:p-6';
  
  return (
    <div className={`rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm shadow-sm ${defaultPadding} ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4 sm:mb-6">
          {title && <h3 className="text-base sm:text-lg font-semibold text-white">{title}</h3>}
          {subtitle && <p className="mt-1 text-xs sm:text-sm text-zinc-400">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
