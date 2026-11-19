// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type RequestAddOnCard25Variant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type RequestAddOnCard25Size = 'small' | 'medium' | 'large';

export interface RequestAddOnCard25Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: RequestAddOnCard25Variant;
  size?: RequestAddOnCard25Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
