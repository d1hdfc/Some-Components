// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type RatingVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type RatingSize = 'small' | 'medium' | 'large';

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: RatingVariant;
  size?: RatingSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
