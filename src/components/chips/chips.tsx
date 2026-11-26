// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { ChipsProps } from './chips.types';
import './chips.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Chips: React.FC<ChipsProps> = ({
  children = 'Chips',
  size = 'medium',
  variant = 'default',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const combinedClasses = cx(
    'ui-chips',
    `ui-chips--${size}`,
    `ui-chips--${variant}`,
    fullWidth && 'ui-chips--full-width',
    isDisabled && 'ui-chips--disabled',
    loading && 'ui-chips--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-chips__spinner" aria-hidden="true" />}
      <span className="ui-chips__content">{children}</span>
    </div>
  );
};

export default Chips;
