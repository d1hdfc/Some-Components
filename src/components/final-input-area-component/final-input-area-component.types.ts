// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type FinalInputAreaComponentVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type FinalInputAreaComponentSize = 'small' | 'medium';

export interface FinalInputAreaComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: FinalInputAreaComponentVariant;
  size?: FinalInputAreaComponentSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
