// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { BrowserBarProps } from './browser-bar.types';
import './browser-bar.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const BrowserBar: React.FC<BrowserBarProps> = ({
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
    'ui-browser-bar',
    `ui-browser-bar--${size}`,
    `ui-browser-bar--${variant}`,
    fullWidth && 'ui-browser-bar--full-width',
    isDisabled && 'ui-browser-bar--disabled',
    loading && 'ui-browser-bar--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-browser-bar__spinner" aria-hidden="true" />}
      <span className="ui-browser-bar__content">{children}</span>
    </div>
  );
};

export default BrowserBar;
