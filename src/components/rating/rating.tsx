// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { RatingProps } from './rating.types';
import './rating.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Rating: React.FC<RatingProps> = ({
  children = 'Rating',
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
    'ui-rating',
    `ui-rating--${size}`,
    `ui-rating--${variant}`,
    fullWidth && 'ui-rating--full-width',
    isDisabled && 'ui-rating--disabled',
    loading && 'ui-rating--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-rating__spinner" aria-hidden="true" />}
      <span className="ui-rating__content">{children}</span>
    </div>
  );
};

export default Rating;
