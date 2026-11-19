// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { InputFieldAllVariantsProps } from './input-field-all-variants.types';
import './input-field-all-variants.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const InputFieldAllVariants: React.FC<InputFieldAllVariantsProps> = ({
  children = 'Label',
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
    'ui-input-field-all-variants',
    `ui-input-field-all-variants--${size}`,
    `ui-input-field-all-variants--${variant}`,
    fullWidth && 'ui-input-field-all-variants--full-width',
    isDisabled && 'ui-input-field-all-variants--disabled',
    loading && 'ui-input-field-all-variants--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-input-field-all-variants__spinner" aria-hidden="true" />}
      <span className="ui-input-field-all-variants__content">{children}</span>
    </div>
  );
};

export default InputFieldAllVariants;
