// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type EnterMPinVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type EnterMPinSize = 'small' | 'medium' | 'large';

export interface EnterMPinProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: EnterMPinVariant;
  size?: EnterMPinSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
