// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { PopoverProps } from './popover.types';
import './popover.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Popover: React.FC<PopoverProps> = ({
  children = 'Popover',
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
    'ui-popover',
    `ui-popover--${size}`,
    `ui-popover--${variant}`,
    fullWidth && 'ui-popover--full-width',
    isDisabled && 'ui-popover--disabled',
    loading && 'ui-popover--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-popover__spinner" aria-hidden="true" />}
      <span className="ui-popover__content">{children}</span>
    </div>
  );
};

export default Popover;
