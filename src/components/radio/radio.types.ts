// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type RadioVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type RadioSize = 'small' | 'medium' | 'large';

export interface RadioProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: RadioVariant;
  size?: RadioSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
