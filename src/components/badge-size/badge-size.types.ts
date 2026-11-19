// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type BadgeSizeVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type BadgeSizeSize = 'large' | 'medium' | 'small';

export interface BadgeSizeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: BadgeSizeVariant;
  size?: BadgeSizeSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
