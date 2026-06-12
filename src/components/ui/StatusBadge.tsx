import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import type { AgentStatus } from '../../types';

interface StatusBadgeProps {
  status: AgentStatus;
  label?: string;
  size?: 'sm' | 'md';
  showDot?: boolean;
  className?: string;
}

const statusConfig: Record<AgentStatus, { label: string; dot: string; bg: string; text: string }> = {
  idle: {
    label: 'Idle',
    dot: 'bg-ink-disabled',
    bg: 'bg-surface-secondary',
    text: 'text-ink-tertiary',
  },
  thinking: {
    label: 'Thinking…',
    dot: 'bg-warning',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
  },
  streaming: {
    label: 'Writing',
    dot: 'bg-success',
    bg: 'bg-green-50',
    text: 'text-green-700',
  },
  done: {
    label: 'Done',
    dot: 'bg-success',
    bg: 'bg-green-50',
    text: 'text-green-700',
  },
  error: {
    label: 'Error',
    dot: 'bg-error',
    bg: 'bg-red-50',
    text: 'text-red-600',
  },
};

export function StatusBadge({ status, label, size = 'sm', showDot = true, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label || config.label;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        size === 'sm' ? 'text-caption px-2 py-0.5' : 'text-body-sm px-2.5 py-1',
        config.bg,
        config.text,
        className
      )}
      aria-label={`Status: ${displayLabel}`}
    >
      {showDot && (
        <motion.span
          className={clsx('w-1.5 h-1.5 rounded-full shrink-0', config.dot)}
          animate={
            status === 'thinking' || status === 'streaming'
              ? { opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }
              : {}
          }
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        />
      )}
      {displayLabel}
    </span>
  );
}
