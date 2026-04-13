import { forwardRef } from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface CardProps extends ViewProps {
  className?: string;
  variant?: 'gunmetal' | 'glass' | 'outline';
}

const Card = forwardRef<View, CardProps>(
  ({ className, variant = 'glass', ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          'rounded-3xl overflow-hidden',
          {
            // The signature glassmorphism from the design
            'bg-slate-800/40 border border-white/10': variant === 'glass',
            // Opaque Gunmetal
            'bg-surface-container-highest border border-white/5': variant === 'gunmetal',
            // Outline only
            'border border-outline-variant bg-transparent': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export { Card };
