// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type ProtoVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type ProtoSize = 'small' | 'medium' | 'large';

export interface ProtoProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: ProtoVariant;
  size?: ProtoSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
