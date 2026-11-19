// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type CardVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type CardSize = 'small' | 'medium' | 'large';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
