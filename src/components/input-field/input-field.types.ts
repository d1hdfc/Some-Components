// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type InputFieldVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type InputFieldSize = 'small' | 'medium';

export interface InputFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: InputFieldVariant;
  size?: InputFieldSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
