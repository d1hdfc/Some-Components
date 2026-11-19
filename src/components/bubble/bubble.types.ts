// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type BubbleVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type BubbleSize = 'small' | 'medium' | 'large';

export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: BubbleVariant;
  size?: BubbleSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
