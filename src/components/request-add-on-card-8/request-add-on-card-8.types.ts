// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type RequestAddOnCard8Variant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type RequestAddOnCard8Size = 'small' | 'medium' | 'large';

export interface RequestAddOnCard8Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: RequestAddOnCard8Variant;
  size?: RequestAddOnCard8Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
