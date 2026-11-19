// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { PaOfferScreenProps } from './pa-offer-screen.types';
import './pa-offer-screen.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const PaOfferScreen: React.FC<PaOfferScreenProps> = ({
  children = 'hdfcbank.com',
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
    'ui-pa-offer-screen',
    `ui-pa-offer-screen--${size}`,
    `ui-pa-offer-screen--${variant}`,
    fullWidth && 'ui-pa-offer-screen--full-width',
    isDisabled && 'ui-pa-offer-screen--disabled',
    loading && 'ui-pa-offer-screen--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-pa-offer-screen__spinner" aria-hidden="true" />}
      <span className="ui-pa-offer-screen__content">{children}</span>
    </div>
  );
};

export default PaOfferScreen;
