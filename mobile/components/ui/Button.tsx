import { forwardRef } from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { Text } from './Text';
import { cn } from '@/lib/utils';

export interface ButtonProps extends PressableProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  textClassName?: string;
  children: React.ReactNode;
}

const Button = forwardRef<View, ButtonProps>(
  ({ className, variant = 'default', size = 'default', textClassName, children, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        className={cn(
          'flex-row items-center justify-center rounded-xl transition-all active:scale-95',
          {
            'bg-gunmetal-DEFAULT border border-white/5': variant === 'default',
            'border-2 border-primary/40 bg-transparent': variant === 'outline',
            'bg-transparent': variant === 'ghost',
            'bg-surface-variant/40 border border-white/10': variant === 'glass', // Typical dark glass styling
            'h-12 px-6 py-3': size === 'default',
            'h-10 px-4 py-2': size === 'sm',
            'h-14 px-8 py-4': size === 'lg',
            'h-12 w-12 p-2': size === 'icon',
          },
          className
        )}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text
            className={cn(
              'font-label font-bold text-center',
              {
                'text-white': variant === 'default' || variant === 'glass',
                'text-primary': variant === 'outline',
                'text-secondary': variant === 'ghost',
                'text-sm': size === 'default',
                'text-xs': size === 'sm',
                'text-base': size === 'lg',
              },
              textClassName
            )}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);
Button.displayName = 'Button';

export { Button };
