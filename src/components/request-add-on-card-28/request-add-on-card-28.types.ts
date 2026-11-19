// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type RequestAddOnCard28Variant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type RequestAddOnCard28Size = 'small' | 'medium' | 'large';

export interface RequestAddOnCard28Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: RequestAddOnCard28Variant;
  size?: RequestAddOnCard28Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
