// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type TagSizeVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type TagSizeSize = 'large' | 'small' | 'medium';

export interface TagSizeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: TagSizeVariant;
  size?: TagSizeSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
