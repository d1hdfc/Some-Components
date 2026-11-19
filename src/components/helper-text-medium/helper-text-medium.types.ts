// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type HelperTextMediumVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type HelperTextMediumSize = 'small' | 'medium' | 'large';

export interface HelperTextMediumProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: HelperTextMediumVariant;
  size?: HelperTextMediumSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
