// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type CarouselHookVariant = 'slider' | 'dots';
export type CarouselHookSize = 'small' | 'medium' | 'large';

export interface CarouselHookProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: CarouselHookVariant;
  size?: CarouselHookSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
