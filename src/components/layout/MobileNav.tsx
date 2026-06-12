import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { LayoutGrid, Users, TrendingUp, User } from 'lucide-react';
import type { MobileTab } from '../../types';

interface MobileNavProps {
  activeTab: MobileTab;
  onChange: (tab: MobileTab) => void;
}

const tabs: { id: MobileTab; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'workspace', label: 'Workspace', icon: LayoutGrid },
  { id: 'agents', label: 'Agents', icon: Users },
  { id: 'insights', label: 'Insights', icon: TrendingUp },
  { id: 'profile', label: 'Profile', icon: User },
];

export function MobileNav({ activeTab, onChange }: MobileNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-surface-border safe-area-bottom"
      aria-label="Mobile navigation"
      role="navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              whileTap={{ scale: 0.9 }}
              className={clsx(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-xl min-w-[64px]',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isActive ? 'text-primary' : 'text-ink-tertiary hover:text-ink-secondary'
              )}
              aria-current={isActive ? 'page' : undefined}
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon size={20} aria-hidden="true" />
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-dot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
              <span className="text-[10px] font-semibold tracking-wide leading-none">
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
