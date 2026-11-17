// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type TextFieldVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type TextFieldSize = 'small' | 'medium' | 'large';

export interface TextFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
