// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type StyleVariant = 'illustration' | 'image' | 'icon' | 'text';
export type StyleSize = 'small' | 'medium' | 'large';

export interface StyleProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: StyleVariant;
  size?: StyleSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
