// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type PopoverVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type PopoverSize = 'small' | 'medium' | 'large';

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: PopoverVariant;
  size?: PopoverSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
