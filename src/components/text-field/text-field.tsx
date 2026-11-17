// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { TextFieldProps } from './text-field.types';
import './text-field.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const TextField: React.FC<TextFieldProps> = ({
  children = 'TextField',
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
    'ui-text-field',
    `ui-text-field--${size}`,
    `ui-text-field--${variant}`,
    fullWidth && 'ui-text-field--full-width',
    isDisabled && 'ui-text-field--disabled',
    loading && 'ui-text-field--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-text-field__spinner" aria-hidden="true" />}
      <span className="ui-text-field__content">{children}</span>
    </div>
  );
};

export default TextField;
