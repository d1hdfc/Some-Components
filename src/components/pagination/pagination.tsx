// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { PaginationProps } from './pagination.types';
import './pagination.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Pagination: React.FC<PaginationProps> = ({
  children = 'Lisiting per page',
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
    'ui-pagination',
    `ui-pagination--${size}`,
    `ui-pagination--${variant}`,
    fullWidth && 'ui-pagination--full-width',
    isDisabled && 'ui-pagination--disabled',
    loading && 'ui-pagination--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-pagination__spinner" aria-hidden="true" />}
      <span className="ui-pagination__content">{children}</span>
    </div>
  );
};

export default Pagination;
