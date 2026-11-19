// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { FooterDownProps } from './footer-down.types';
import './footer-down.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const FooterDown: React.FC<FooterDownProps> = ({
  children = 'DESIGN SYSTEM',
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
    'ui-footer-down',
    `ui-footer-down--${size}`,
    `ui-footer-down--${variant}`,
    fullWidth && 'ui-footer-down--full-width',
    isDisabled && 'ui-footer-down--disabled',
    loading && 'ui-footer-down--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-footer-down__spinner" aria-hidden="true" />}
      <span className="ui-footer-down__content">{children}</span>
    </div>
  );
};

export default FooterDown;
