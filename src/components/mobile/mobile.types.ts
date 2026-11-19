// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type MobileVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type MobileSize = 'small' | 'medium' | 'large';

export interface MobileProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: MobileVariant;
  size?: MobileSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
