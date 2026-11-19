// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type PreviewVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type PreviewSize = 'small' | 'medium' | 'large';

export interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: PreviewVariant;
  size?: PreviewSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
