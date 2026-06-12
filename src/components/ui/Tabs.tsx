import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: number;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (id: string) => void;
  variant?: 'underline' | 'pill';
  className?: string;
}

export function Tabs({ tabs, defaultTab, activeTab: controlledTab, onChange, variant = 'underline', className }: TabsProps) {
  const [internalActive, setInternalActive] = useState(defaultTab || tabs[0]?.id);
  const active = controlledTab ?? internalActive;

  function handleChange(id: string) {
    setInternalActive(id);
    onChange?.(id);
  }

  return (
    <div
      className={clsx(
        'flex',
        variant === 'underline' && 'border-b border-surface-border gap-0',
        variant === 'pill' && 'bg-surface-secondary rounded-xl p-1 gap-1',
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => handleChange(tab.id)}
            className={clsx(
              'relative flex items-center gap-1.5 font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset select-none',
              variant === 'underline'
                ? clsx(
                    'text-body-sm px-4 py-3',
                    isActive ? 'text-ink' : 'text-ink-tertiary hover:text-ink-secondary'
                  )
                : clsx(
                    'text-body-sm px-3 py-1.5 rounded-lg',
                    isActive ? 'text-ink bg-white shadow-xs' : 'text-ink-secondary hover:text-ink'
                  )
            )}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span className="text-caption bg-primary/10 text-primary rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                {tab.badge}
              </span>
            )}
            {variant === 'underline' && isActive && (
              <motion.span
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
