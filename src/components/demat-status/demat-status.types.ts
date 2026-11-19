// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type DematStatusVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type DematStatusSize = 'small' | 'medium' | 'large';

export interface DematStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: DematStatusVariant;
  size?: DematStatusSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
