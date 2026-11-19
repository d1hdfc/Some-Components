// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type ReviewDetailsVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type ReviewDetailsSize = 'small' | 'medium' | 'large';

export interface ReviewDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: ReviewDetailsVariant;
  size?: ReviewDetailsSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
