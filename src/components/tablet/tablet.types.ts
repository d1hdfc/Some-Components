// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type TabletVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type TabletSize = 'small' | 'medium' | 'large';

export interface TabletProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: TabletVariant;
  size?: TabletSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
