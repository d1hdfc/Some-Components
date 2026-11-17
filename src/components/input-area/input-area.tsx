// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { InputAreaProps } from './input-area.types';
import './input-area.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const InputArea: React.FC<InputAreaProps> = ({
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
    'ui-input-area',
    `ui-input-area--${size}`,
    `ui-input-area--${variant}`,
    fullWidth && 'ui-input-area--full-width',
    isDisabled && 'ui-input-area--disabled',
    loading && 'ui-input-area--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-input-area__spinner" aria-hidden="true" />}
      <span className="ui-input-area__content">{children}</span>
    </div>
  );
};

export default InputArea;
