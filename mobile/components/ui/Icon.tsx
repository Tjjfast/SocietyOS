import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { cn } from '@/lib/utils';

export interface IconProps {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  size?: number;
  color?: string;
  className?: string;
}

export function Icon({ name, size = 24, color = '#dbe5ff', className }: IconProps) {
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color}
      className={className}
    />
  );
}
