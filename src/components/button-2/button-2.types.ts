// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type Button2Variant = 'primary' | 'secondary' | 'tertiary' | 'link' | 'default' | 'icon' | 'gradient' | 'white';
export type Button2Size = 'large' | 'medium' | 'small' | 'xsmall';

export interface Button2Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: Button2Variant;
  size?: Button2Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
