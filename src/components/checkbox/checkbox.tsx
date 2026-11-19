// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { CheckboxProps } from './checkbox.types';
import './checkbox.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Checkbox: React.FC<CheckboxProps> = ({
  children = 'Component',
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
    'ui-checkbox',
    `ui-checkbox--${size}`,
    `ui-checkbox--${variant}`,
    fullWidth && 'ui-checkbox--full-width',
    isDisabled && 'ui-checkbox--disabled',
    loading && 'ui-checkbox--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-checkbox__spinner" aria-hidden="true" />}
      <span className="ui-checkbox__content">{children}</span>
    </div>
  );
};

export default Checkbox;
