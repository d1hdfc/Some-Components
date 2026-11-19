// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type PaginationVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type PaginationSize = 'small' | 'medium' | 'large';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: PaginationVariant;
  size?: PaginationSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
