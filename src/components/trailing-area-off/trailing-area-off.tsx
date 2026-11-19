// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { TrailingAreaOffProps } from './trailing-area-off.types';
import './trailing-area-off.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const TrailingAreaOff: React.FC<TrailingAreaOffProps> = ({
  children = 'trailingArea: Off',
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
    'ui-trailing-area-off',
    `ui-trailing-area-off--${size}`,
    `ui-trailing-area-off--${variant}`,
    fullWidth && 'ui-trailing-area-off--full-width',
    isDisabled && 'ui-trailing-area-off--disabled',
    loading && 'ui-trailing-area-off--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-trailing-area-off__spinner" aria-hidden="true" />}
      <span className="ui-trailing-area-off__content">{children}</span>
    </div>
  );
};

export default TrailingAreaOff;
