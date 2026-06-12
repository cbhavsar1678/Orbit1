import { type HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  side?: 'left' | 'right' | 'center';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  scrollable?: boolean;
}

export function Panel({ side = 'center', header, footer, scrollable = true, children, className, ...props }: PanelProps) {
  return (
    <div
      className={clsx(
        'flex flex-col h-full bg-white',
        side === 'left' && 'border-r border-surface-border',
        side === 'right' && 'border-l border-surface-border',
        className
      )}
      {...props}
    >
      {header && (
        <div className="shrink-0 border-b border-surface-border">
          {header}
        </div>
      )}
      <div className={clsx('flex-1 min-h-0', scrollable && 'overflow-y-auto')}>
        {children}
      </div>
      {footer && (
        <div className="shrink-0 border-t border-surface-border">
          {footer}
        </div>
      )}
    </div>
  );
}
