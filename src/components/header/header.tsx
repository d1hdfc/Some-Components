// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { HeaderProps } from './header.types';
import './header.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Header: React.FC<HeaderProps> = ({
  children = 'Title',
  size = 'medium',
  variant = 'central-aligned',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const combinedClasses = cx(
    'ui-header',
    `ui-header--${size}`,
    `ui-header--${variant}`,
    fullWidth && 'ui-header--full-width',
    isDisabled && 'ui-header--disabled',
    loading && 'ui-header--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-header__spinner" aria-hidden="true" />}
      <span className="ui-header__content">{children}</span>
    </div>
  );
};

export default Header;
