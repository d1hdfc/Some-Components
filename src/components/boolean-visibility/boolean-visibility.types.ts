// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type BooleanVisibilityVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type BooleanVisibilitySize = 'small' | 'medium' | 'large';

export interface BooleanVisibilityProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: BooleanVisibilityVariant;
  size?: BooleanVisibilitySize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
