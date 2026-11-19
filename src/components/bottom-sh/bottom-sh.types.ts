// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type BottomShVariant = 'input' | 'style2';
export type BottomShSize = 'small' | 'medium' | 'large';

export interface BottomShProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: BottomShVariant;
  size?: BottomShSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
