// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { RadioProps } from './radio.types';
import './radio.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Radio: React.FC<RadioProps> = ({
  children = 'Radio',
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
    'ui-radio',
    `ui-radio--${size}`,
    `ui-radio--${variant}`,
    fullWidth && 'ui-radio--full-width',
    isDisabled && 'ui-radio--disabled',
    loading && 'ui-radio--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-radio__spinner" aria-hidden="true" />}
      <span className="ui-radio__content">{children}</span>
    </div>
  );
};

export default Radio;
