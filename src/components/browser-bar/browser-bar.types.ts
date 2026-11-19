// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type BrowserBarVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type BrowserBarSize = 'small' | 'medium' | 'large';

export interface BrowserBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: BrowserBarVariant;
  size?: BrowserBarSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
