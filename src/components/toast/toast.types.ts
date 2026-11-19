// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type ToastVariant = 'info' | 'highlight' | 'neutral' | 'warning' | 'error' | 'success';
export type ToastSize = 'small' | 'medium' | 'large';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: ToastVariant;
  size?: ToastSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
