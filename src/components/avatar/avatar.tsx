// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { AvatarProps } from './avatar.types';
import './avatar.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Avatar: React.FC<AvatarProps> = ({
  children = 'Component',
  size = 'xx-xlarge-72',
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const combinedClasses = cx(
    'ui-avatar',
    `ui-avatar--${size}`,
    `ui-avatar--${variant}`,
    fullWidth && 'ui-avatar--full-width',
    isDisabled && 'ui-avatar--disabled',
    loading && 'ui-avatar--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-avatar__spinner" aria-hidden="true" />}
      <span className="ui-avatar__content">{children}</span>
    </div>
  );
};

export default Avatar;
