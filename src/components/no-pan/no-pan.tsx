// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { NoPanProps } from './no-pan.types';
import './no-pan.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const NoPan: React.FC<NoPanProps> = ({
  children = 'NRE/ NRO Savings Account Opening',
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
    'ui-no-pan',
    `ui-no-pan--${size}`,
    `ui-no-pan--${variant}`,
    fullWidth && 'ui-no-pan--full-width',
    isDisabled && 'ui-no-pan--disabled',
    loading && 'ui-no-pan--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-no-pan__spinner" aria-hidden="true" />}
      <span className="ui-no-pan__content">{children}</span>
    </div>
  );
};

export default NoPan;
