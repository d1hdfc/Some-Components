// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type ExamplesVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type ExamplesSize = 'small' | 'medium' | 'large';

export interface ExamplesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: ExamplesVariant;
  size?: ExamplesSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
