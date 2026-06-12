import { clsx } from 'clsx';

interface AvatarProps {
  name?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  gradient?: string;
  className?: string;
  src?: string;
  alt?: string;
}

const sizeMap = {
  xs: { container: 'w-6 h-6', text: 'text-[9px]' },
  sm: { container: 'w-8 h-8', text: 'text-caption font-semibold' },
  md: { container: 'w-10 h-10', text: 'text-body-sm font-semibold' },
  lg: { container: 'w-12 h-12', text: 'text-body font-semibold' },
  xl: { container: 'w-16 h-16', text: 'text-h3 font-bold' },
};

export function Avatar({ name, initials, size = 'md', gradient, className, src, alt }: AvatarProps) {
  const { container, text } = sizeMap[size];
  const displayInitials = initials || name?.slice(0, 2).toUpperCase() || '?';

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={clsx('rounded-full object-cover shrink-0', container, className)}
      />
    );
  }

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center shrink-0 select-none',
        container,
        className
      )}
      style={gradient ? { background: gradient } : { background: '#E1E4FF' }}
      aria-label={name || displayInitials}
      role="img"
    >
      <span className={clsx(text, 'text-white leading-none')}>{displayInitials}</span>
    </div>
  );
}
