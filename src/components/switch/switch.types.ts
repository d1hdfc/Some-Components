// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type SwitchVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type SwitchSize = 'small' | 'medium' | 'large';

export interface SwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: SwitchVariant;
  size?: SwitchSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
