// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type VariablesVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type VariablesSize = 'small' | 'medium' | 'large';

export interface VariablesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: VariablesVariant;
  size?: VariablesSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
