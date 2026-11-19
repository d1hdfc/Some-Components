// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type TrailingAreaOffVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type TrailingAreaOffSize = 'small' | 'medium' | 'large';

export interface TrailingAreaOffProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: TrailingAreaOffVariant;
  size?: TrailingAreaOffSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
