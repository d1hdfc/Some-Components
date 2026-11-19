// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type RequestAddOnCard7Variant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type RequestAddOnCard7Size = 'small' | 'medium' | 'large';

export interface RequestAddOnCard7Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: RequestAddOnCard7Variant;
  size?: RequestAddOnCard7Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
