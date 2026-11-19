// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { AadharCardProps } from './aadhar-card.types';
import './aadhar-card.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const AadharCard: React.FC<AadharCardProps> = ({
  children = 'Authenticate with Aadhaar',
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
    'ui-aadhar-card',
    `ui-aadhar-card--${size}`,
    `ui-aadhar-card--${variant}`,
    fullWidth && 'ui-aadhar-card--full-width',
    isDisabled && 'ui-aadhar-card--disabled',
    loading && 'ui-aadhar-card--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-aadhar-card__spinner" aria-hidden="true" />}
      <span className="ui-aadhar-card__content">{children}</span>
    </div>
  );
};

export default AadharCard;
