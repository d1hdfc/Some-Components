// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type NoPanVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type NoPanSize = 'small' | 'medium' | 'large';

export interface NoPanProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: NoPanVariant;
  size?: NoPanSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
