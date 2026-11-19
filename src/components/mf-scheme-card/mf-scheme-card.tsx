// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { MfSchemeCardProps } from './mf-scheme-card.types';
import './mf-scheme-card.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const MfSchemeCard: React.FC<MfSchemeCardProps> = ({
  children = 'HDFC Retirement Savings Fund Equity Plan',
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
    'ui-mf-scheme-card',
    `ui-mf-scheme-card--${size}`,
    `ui-mf-scheme-card--${variant}`,
    fullWidth && 'ui-mf-scheme-card--full-width',
    isDisabled && 'ui-mf-scheme-card--disabled',
    loading && 'ui-mf-scheme-card--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-mf-scheme-card__spinner" aria-hidden="true" />}
      <span className="ui-mf-scheme-card__content">{children}</span>
    </div>
  );
};

export default MfSchemeCard;
