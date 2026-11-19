// Generated from Figma by scripts/code-generator.cjs.
import type React from 'react';

export type AvatarVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined';
export type AvatarSize = 'xx-xlarge-72' | 'x-xlarge-64' | 'xlarge-56' | 'large-48' | 'medium-40' | 'small-32' | 'xsmall-24' | 'xxxlarge-72' | 'xxlarge-64';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: AvatarVariant;
  size?: AvatarSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
