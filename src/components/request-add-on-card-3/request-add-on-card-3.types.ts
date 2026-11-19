// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type RequestAddOnCard3Variant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type RequestAddOnCard3Size = 'small' | 'medium' | 'large';

export interface RequestAddOnCard3Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: RequestAddOnCard3Variant;
  size?: RequestAddOnCard3Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
