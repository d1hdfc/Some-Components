// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type TabsVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type TabsSize = 'small' | 'medium' | 'large';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: TabsVariant;
  size?: TabsSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
