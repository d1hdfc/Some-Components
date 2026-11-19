// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type StatusBarVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type StatusBarSize = 'small' | 'medium' | 'large';

export interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: StatusBarVariant;
  size?: StatusBarSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
