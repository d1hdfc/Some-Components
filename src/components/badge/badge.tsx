// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { BadgeProps } from './badge.types';
import './badge.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Badge: React.FC<BadgeProps> = ({
  children = 'Badge',
  size = 'medium',
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const combinedClasses = cx(
    'ui-badge',
    `ui-badge--${size}`,
    `ui-badge--${variant}`,
    fullWidth && 'ui-badge--full-width',
    isDisabled && 'ui-badge--disabled',
    loading && 'ui-badge--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-badge__spinner" aria-hidden="true" />}
      <span className="ui-badge__content">{children}</span>
    </div>
  );
};

export default Badge;
