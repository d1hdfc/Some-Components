// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type ChipsVariant = 'default' | 'primary' | 'warning' | 'destructive' | 'success' | 'neutral' | 'violet' | 'rust' | 'yellow' | 'purple' | 'info' | 'filled' | 'accent' | 'outline';
export type ChipsSize = 'large' | 'medium' | 'small';

export interface ChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: ChipsVariant;
  size?: ChipsSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
