// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type InputAreaVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type InputAreaSize = 'small' | 'medium';

export interface InputAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: InputAreaVariant;
  size?: InputAreaSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
