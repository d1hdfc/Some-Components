// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { StatusBarProps } from './status-bar.types';
import './status-bar.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const StatusBar: React.FC<StatusBarProps> = ({
  children = '12:30',
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
    'ui-status-bar',
    `ui-status-bar--${size}`,
    `ui-status-bar--${variant}`,
    fullWidth && 'ui-status-bar--full-width',
    isDisabled && 'ui-status-bar--disabled',
    loading && 'ui-status-bar--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-status-bar__spinner" aria-hidden="true" />}
      <span className="ui-status-bar__content">{children}</span>
    </div>
  );
};

export default StatusBar;
