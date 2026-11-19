// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type TestVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type TestSize = 'small' | 'medium' | 'large';

export interface TestProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: TestVariant;
  size?: TestSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
