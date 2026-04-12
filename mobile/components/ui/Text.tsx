import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface TextProps extends RNTextProps {
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'label' | 'caption';
}

const Text = forwardRef<RNText, TextProps>(
  ({ className, variant = 'body', style, ...props }, ref) => {
    return (
      <RNText
        ref={ref}
        className={cn(
          'text-foreground',
          {
            'font-headline text-3xl font-extrabold tracking-tight': variant === 'h1',
            'font-headline text-2xl font-bold tracking-tight': variant === 'h2',
            'font-headline text-xl font-bold tracking-tight': variant === 'h3',
            'font-headline text-lg font-semibold tracking-tight': variant === 'h4',
            'font-body text-base font-normal': variant === 'body',
            'font-label text-sm font-semibold tracking-wide': variant === 'label',
            'font-body text-xs font-medium text-secondary': variant === 'caption',
          },
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text };
