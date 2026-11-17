// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { ProgressBarProps } from './progress-bar.types';
import './progress-bar.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const ProgressBar: React.FC<ProgressBarProps> = ({
  children = 'ProgressBar',
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
    'ui-progress-bar',
    `ui-progress-bar--${size}`,
    `ui-progress-bar--${variant}`,
    fullWidth && 'ui-progress-bar--full-width',
    isDisabled && 'ui-progress-bar--disabled',
    loading && 'ui-progress-bar--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-progress-bar__spinner" aria-hidden="true" />}
      <span className="ui-progress-bar__content">{children}</span>
    </div>
  );
};

export default ProgressBar;
