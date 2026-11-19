// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type AadharCardVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type AadharCardSize = 'small' | 'medium' | 'large';

export interface AadharCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: AadharCardVariant;
  size?: AadharCardSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
