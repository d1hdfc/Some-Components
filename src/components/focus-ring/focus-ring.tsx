// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { FocusRingProps } from './focus-ring.types';
import './focus-ring.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const FocusRing: React.FC<FocusRingProps> = ({
  children = 'Component',
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
    'ui-focus-ring',
    `ui-focus-ring--${size}`,
    `ui-focus-ring--${variant}`,
    fullWidth && 'ui-focus-ring--full-width',
    isDisabled && 'ui-focus-ring--disabled',
    loading && 'ui-focus-ring--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-focus-ring__spinner" aria-hidden="true" />}
      <span className="ui-focus-ring__content">{children}</span>
    </div>
  );
};

export default FocusRing;
