// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { HelperTextOffProps } from './helper-text-off.types';
import './helper-text-off.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const HelperTextOff: React.FC<HelperTextOffProps> = ({
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
    'ui-helper-text-off',
    `ui-helper-text-off--${size}`,
    `ui-helper-text-off--${variant}`,
    fullWidth && 'ui-helper-text-off--full-width',
    isDisabled && 'ui-helper-text-off--disabled',
    loading && 'ui-helper-text-off--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-helper-text-off__spinner" aria-hidden="true" />}
      <span className="ui-helper-text-off__content">{children}</span>
    </div>
  );
};

export default HelperTextOff;
