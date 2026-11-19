// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type NestedInstancesVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type NestedInstancesSize = 'small' | 'medium' | 'large';

export interface NestedInstancesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: NestedInstancesVariant;
  size?: NestedInstancesSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
