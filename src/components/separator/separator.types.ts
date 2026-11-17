// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type SeparatorVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type SeparatorSize = 'small' | 'medium' | 'large';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: SeparatorVariant;
  size?: SeparatorSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
