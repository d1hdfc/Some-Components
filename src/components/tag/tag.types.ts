// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type TagVariant = 'primary' | 'neutral' | 'warning' | 'success' | 'destructive';
export type TagSize = 'small' | 'medium' | 'large';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
