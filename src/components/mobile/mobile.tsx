// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { MobileProps } from './mobile.types';
import './mobile.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Mobile: React.FC<MobileProps> = ({
  children = 'Title',
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
    'ui-mobile',
    `ui-mobile--${size}`,
    `ui-mobile--${variant}`,
    fullWidth && 'ui-mobile--full-width',
    isDisabled && 'ui-mobile--disabled',
    loading && 'ui-mobile--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-mobile__spinner" aria-hidden="true" />}
      <span className="ui-mobile__content">{children}</span>
    </div>
  );
};

export default Mobile;
