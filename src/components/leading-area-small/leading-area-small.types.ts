// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type LeadingAreaSmallVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type LeadingAreaSmallSize = 'small' | 'medium' | 'large';

export interface LeadingAreaSmallProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: LeadingAreaSmallVariant;
  size?: LeadingAreaSmallSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
