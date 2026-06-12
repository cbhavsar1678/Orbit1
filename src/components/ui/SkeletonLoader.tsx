import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export function Skeleton({ className, rounded = 'md' }: SkeletonProps) {
  const roundedMap = { sm: 'rounded', md: 'rounded-lg', lg: 'rounded-xl', full: 'rounded-full' };
  return (
    <div
      className={clsx('shimmer', roundedMap[rounded], className)}
      aria-hidden="true"
      role="presentation"
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={clsx('flex flex-col gap-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={clsx('h-3.5', i === lines - 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={clsx('bg-white border border-surface-border rounded-2xl p-5 space-y-4', className)} aria-hidden="true">
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8" rounded="full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <SkeletonText lines={4} />
    </div>
  );
}

export function SkeletonWorkstream({ className }: { className?: string }) {
  return (
    <div className={clsx('space-y-3', className)}>
      {[0, 1, 2].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
