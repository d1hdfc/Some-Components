// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type BadgeVariant = 'primary' | 'neutral' | 'success' | 'warning' | 'destructive' | 'info' | 'yellow' | 'rust' | 'purple' | 'violet' | 'filled' | 'accent' | 'outline';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
