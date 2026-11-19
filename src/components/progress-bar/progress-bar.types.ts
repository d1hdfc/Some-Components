// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type ProgressBarVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type ProgressBarSize = 'small' | 'medium' | 'large';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
