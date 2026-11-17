// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { SwitchProps } from './switch.types';
import './switch.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Switch: React.FC<SwitchProps> = ({
  children = 'Switch',
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
    'ui-switch',
    `ui-switch--${size}`,
    `ui-switch--${variant}`,
    fullWidth && 'ui-switch--full-width',
    isDisabled && 'ui-switch--disabled',
    loading && 'ui-switch--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-switch__spinner" aria-hidden="true" />}
      <span className="ui-switch__content">{children}</span>
    </div>
  );
};

export default Switch;
