// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type SearchBarVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type SearchBarSize = 'small' | 'medium' | 'large';

export interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: SearchBarVariant;
  size?: SearchBarSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
