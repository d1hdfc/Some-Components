// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type DesktopVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type DesktopSize = 'small' | 'medium' | 'large';

export interface DesktopProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: DesktopVariant;
  size?: DesktopSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
