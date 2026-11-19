// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type HelperTextSmallVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type HelperTextSmallSize = 'small' | 'medium' | 'large';

export interface HelperTextSmallProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: HelperTextSmallVariant;
  size?: HelperTextSmallSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
