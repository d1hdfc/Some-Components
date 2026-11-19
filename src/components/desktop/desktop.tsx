// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { DesktopProps } from './desktop.types';
import './desktop.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Desktop: React.FC<DesktopProps> = ({
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
    'ui-desktop',
    `ui-desktop--${size}`,
    `ui-desktop--${variant}`,
    fullWidth && 'ui-desktop--full-width',
    isDisabled && 'ui-desktop--disabled',
    loading && 'ui-desktop--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-desktop__spinner" aria-hidden="true" />}
      <span className="ui-desktop__content">{children}</span>
    </div>
  );
};

export default Desktop;
