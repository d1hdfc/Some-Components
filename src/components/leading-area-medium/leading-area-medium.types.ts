// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type LeadingAreaMediumVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type LeadingAreaMediumSize = 'small' | 'medium' | 'large';

export interface LeadingAreaMediumProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: LeadingAreaMediumVariant;
  size?: LeadingAreaMediumSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
