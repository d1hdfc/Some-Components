// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type PaOfferScreenVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type PaOfferScreenSize = 'small' | 'medium' | 'large';

export interface PaOfferScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: PaOfferScreenVariant;
  size?: PaOfferScreenSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
