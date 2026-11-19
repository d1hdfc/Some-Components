// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type HelperTextOffVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type HelperTextOffSize = 'small' | 'medium' | 'large';

export interface HelperTextOffProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: HelperTextOffVariant;
  size?: HelperTextOffSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
