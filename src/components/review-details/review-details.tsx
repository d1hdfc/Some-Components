// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { ReviewDetailsProps } from './review-details.types';
import './review-details.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const ReviewDetails: React.FC<ReviewDetailsProps> = ({
  children = '10:00',
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
    'ui-review-details',
    `ui-review-details--${size}`,
    `ui-review-details--${variant}`,
    fullWidth && 'ui-review-details--full-width',
    isDisabled && 'ui-review-details--disabled',
    loading && 'ui-review-details--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-review-details__spinner" aria-hidden="true" />}
      <span className="ui-review-details__content">{children}</span>
    </div>
  );
};

export default ReviewDetails;
