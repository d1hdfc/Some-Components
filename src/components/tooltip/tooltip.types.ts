// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type TooltipVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type TooltipSize = 'small' | 'medium' | 'large';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: TooltipVariant;
  size?: TooltipSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
