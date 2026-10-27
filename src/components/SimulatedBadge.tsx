import React from 'react';
import { Info } from 'lucide-react';

interface SimulatedBadgeProps {
  className?: string;
  subtle?: boolean;
}

export const SimulatedBadge: React.FC<SimulatedBadgeProps> = ({ className = '', subtle = false }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors ${
        subtle
          ? 'bg-surface-subtle text-ink-secondary border border-surface-muted'
          : 'bg-brand-50 text-brand-700 border border-brand-200'
      } ${className}`}
      title="Prototype demo mode: all sensor parameters, bids, and settlements are simulated"
    >
      <Info className="w-3 h-3 text-brand-600 flex-shrink-0" />
      <span>Simulated Data</span>
    </span>
  );
};

