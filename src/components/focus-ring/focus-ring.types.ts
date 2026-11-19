// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type FocusRingVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type FocusRingSize = 'small' | 'medium' | 'large';

export interface FocusRingProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: FocusRingVariant;
  size?: FocusRingSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
