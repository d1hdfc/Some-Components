// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type ContentVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type ContentSize = 'small' | 'medium' | 'large';

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: ContentVariant;
  size?: ContentSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
