// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type TextAreaVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type TextAreaSize = 'small' | 'medium' | 'large';

export interface TextAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: TextAreaVariant;
  size?: TextAreaSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
