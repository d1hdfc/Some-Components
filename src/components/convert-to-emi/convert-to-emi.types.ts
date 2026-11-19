// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type ConvertToEmiVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type ConvertToEmiSize = 'small' | 'medium' | 'large';

export interface ConvertToEmiProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: ConvertToEmiVariant;
  size?: ConvertToEmiSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
