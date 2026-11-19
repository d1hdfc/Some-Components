// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { BooleanVisibilityProps } from './boolean-visibility.types';
import './boolean-visibility.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const BooleanVisibility: React.FC<BooleanVisibilityProps> = ({
  children = 'helperText: Off',
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
    'ui-boolean-visibility',
    `ui-boolean-visibility--${size}`,
    `ui-boolean-visibility--${variant}`,
    fullWidth && 'ui-boolean-visibility--full-width',
    isDisabled && 'ui-boolean-visibility--disabled',
    loading && 'ui-boolean-visibility--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-boolean-visibility__spinner" aria-hidden="true" />}
      <span className="ui-boolean-visibility__content">{children}</span>
    </div>
  );
};

export default BooleanVisibility;
