// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type SnackbarVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type SnackbarSize = 'small' | 'medium' | 'large';

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: SnackbarVariant;
  size?: SnackbarSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
