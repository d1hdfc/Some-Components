// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type CursorRedlinesAndAnnotationsVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type CursorRedlinesAndAnnotationsSize = 'small' | 'medium' | 'large';

export interface CursorRedlinesAndAnnotationsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: CursorRedlinesAndAnnotationsVariant;
  size?: CursorRedlinesAndAnnotationsSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
