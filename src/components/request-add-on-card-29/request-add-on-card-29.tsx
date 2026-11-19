// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { RequestAddOnCard29Props } from './request-add-on-card-29.types';
import './request-add-on-card-29.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const RequestAddOnCard29: React.FC<RequestAddOnCard29Props> = ({
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
    'ui-request-add-on-card-29',
    `ui-request-add-on-card-29--${size}`,
    `ui-request-add-on-card-29--${variant}`,
    fullWidth && 'ui-request-add-on-card-29--full-width',
    isDisabled && 'ui-request-add-on-card-29--disabled',
    loading && 'ui-request-add-on-card-29--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-request-add-on-card-29__spinner" aria-hidden="true" />}
      <span className="ui-request-add-on-card-29__content">{children}</span>
    </div>
  );
};

export default RequestAddOnCard29;
