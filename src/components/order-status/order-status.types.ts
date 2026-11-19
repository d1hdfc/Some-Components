// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type OrderStatusVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type OrderStatusSize = 'small' | 'medium' | 'large';

export interface OrderStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: OrderStatusVariant;
  size?: OrderStatusSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
