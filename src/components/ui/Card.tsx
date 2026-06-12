import { forwardRef, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'ghost' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  as?: 'div' | 'article' | 'section';
}

const variantClasses = {
  default: 'bg-white border border-surface-border shadow-card',
  elevated: 'bg-white border border-surface-border shadow-elevated',
  ghost: 'bg-surface-secondary border border-surface-border-light',
  bordered: 'bg-white border-2 border-surface-border',
};

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hoverable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={clsx(
          'rounded-2xl overflow-hidden',
          variantClasses[variant],
          paddingClasses[padding],
          hoverable && 'cursor-pointer transition-shadow duration-150 hover:shadow-card-hover',
          className
        )}
        {...(hoverable
          ? {
              whileHover: { y: -1 },
              transition: { duration: 0.15 },
            }
          : {})}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
