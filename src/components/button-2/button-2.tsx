// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { Button2Props } from './button-2.types';
import './button-2.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Button2: React.FC<Button2Props> = ({
  children = 'Button',
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
    'ui-button-2',
    `ui-button-2--${size}`,
    `ui-button-2--${variant}`,
    fullWidth && 'ui-button-2--full-width',
    isDisabled && 'ui-button-2--disabled',
    loading && 'ui-button-2--loading',
    className
  );

  return (
    <button
      {...rest}
      className={combinedClasses}
      disabled={isDisabled}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-button-2__spinner" aria-hidden="true" />}
      <span className="ui-button-2__content">{children}</span>
    </button>
  );
};

export default Button2;
