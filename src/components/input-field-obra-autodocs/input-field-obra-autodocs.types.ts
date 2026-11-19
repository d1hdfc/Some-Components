// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type InputFieldObraAutodocsVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type InputFieldObraAutodocsSize = 'small' | 'medium' | 'large';

export interface InputFieldObraAutodocsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: InputFieldObraAutodocsVariant;
  size?: InputFieldObraAutodocsSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
