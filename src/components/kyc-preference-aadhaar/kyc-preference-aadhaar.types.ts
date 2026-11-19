// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type KycPreferenceAadhaarVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type KycPreferenceAadhaarSize = 'small' | 'medium' | 'large';

export interface KycPreferenceAadhaarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: KycPreferenceAadhaarVariant;
  size?: KycPreferenceAadhaarSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
