// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type InputFieldAllVariantsVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type InputFieldAllVariantsSize = 'small' | 'medium' | 'large';

export interface InputFieldAllVariantsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: InputFieldAllVariantsVariant;
  size?: InputFieldAllVariantsSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
