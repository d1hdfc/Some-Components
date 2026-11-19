// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { HelperTextOffTrailingAreaOffProps } from './helper-text-off-trailing-area-off.types';
import './helper-text-off-trailing-area-off.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const HelperTextOffTrailingAreaOff: React.FC<HelperTextOffTrailingAreaOffProps> = ({
  children = 'helperText: Off + trailingArea: Off',
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
    'ui-helper-text-off-trailing-area-off',
    `ui-helper-text-off-trailing-area-off--${size}`,
    `ui-helper-text-off-trailing-area-off--${variant}`,
    fullWidth && 'ui-helper-text-off-trailing-area-off--full-width',
    isDisabled && 'ui-helper-text-off-trailing-area-off--disabled',
    loading && 'ui-helper-text-off-trailing-area-off--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-helper-text-off-trailing-area-off__spinner" aria-hidden="true" />}
      <span className="ui-helper-text-off-trailing-area-off__content">{children}</span>
    </div>
  );
};

export default HelperTextOffTrailingAreaOff;
