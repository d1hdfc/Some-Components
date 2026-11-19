// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { RequestAddOnCard28Props } from './request-add-on-card-28.types';
import './request-add-on-card-28.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const RequestAddOnCard28: React.FC<RequestAddOnCard28Props> = ({
  children = 'Add-On Card requested successfully!',
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
    'ui-request-add-on-card-28',
    `ui-request-add-on-card-28--${size}`,
    `ui-request-add-on-card-28--${variant}`,
    fullWidth && 'ui-request-add-on-card-28--full-width',
    isDisabled && 'ui-request-add-on-card-28--disabled',
    loading && 'ui-request-add-on-card-28--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-request-add-on-card-28__spinner" aria-hidden="true" />}
      <span className="ui-request-add-on-card-28__content">{children}</span>
    </div>
  );
};

export default RequestAddOnCard28;
