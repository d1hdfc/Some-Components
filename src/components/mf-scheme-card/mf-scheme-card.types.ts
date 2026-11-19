// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type MfSchemeCardVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type MfSchemeCardSize = 'small' | 'medium' | 'large';

export interface MfSchemeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: MfSchemeCardVariant;
  size?: MfSchemeCardSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
