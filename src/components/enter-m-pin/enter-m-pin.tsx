// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { EnterMPinProps } from './enter-m-pin.types';
import './enter-m-pin.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const EnterMPin: React.FC<EnterMPinProps> = ({
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
    'ui-enter-m-pin',
    `ui-enter-m-pin--${size}`,
    `ui-enter-m-pin--${variant}`,
    fullWidth && 'ui-enter-m-pin--full-width',
    isDisabled && 'ui-enter-m-pin--disabled',
    loading && 'ui-enter-m-pin--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-enter-m-pin__spinner" aria-hidden="true" />}
      <span className="ui-enter-m-pin__content">{children}</span>
    </div>
  );
};

export default EnterMPin;
