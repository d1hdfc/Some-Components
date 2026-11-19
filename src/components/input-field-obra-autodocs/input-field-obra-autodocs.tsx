// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { InputFieldObraAutodocsProps } from './input-field-obra-autodocs.types';
import './input-field-obra-autodocs.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const InputFieldObraAutodocs: React.FC<InputFieldObraAutodocsProps> = ({
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
    'ui-input-field-obra-autodocs',
    `ui-input-field-obra-autodocs--${size}`,
    `ui-input-field-obra-autodocs--${variant}`,
    fullWidth && 'ui-input-field-obra-autodocs--full-width',
    isDisabled && 'ui-input-field-obra-autodocs--disabled',
    loading && 'ui-input-field-obra-autodocs--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-input-field-obra-autodocs__spinner" aria-hidden="true" />}
      <span className="ui-input-field-obra-autodocs__content">{children}</span>
    </div>
  );
};

export default InputFieldObraAutodocs;
