// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type CarouselVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type CarouselSize = 'small' | 'medium' | 'large';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: CarouselVariant;
  size?: CarouselSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
