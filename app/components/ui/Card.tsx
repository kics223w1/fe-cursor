import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, subtitle, children, className = '' }: CardProps) {
  return (
    <div className={`rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6 shadow-sm ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
