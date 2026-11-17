// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type CheckboxVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type CheckboxSize = 'small' | 'medium' | 'large';

export interface CheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
