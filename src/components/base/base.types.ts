// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type BaseVariant = 'selected' | 'deselected' | 'truncate';
export type BaseSize = 'small' | 'medium' | 'large';

export interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: BaseVariant;
  size?: BaseSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
