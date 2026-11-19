// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { RequestAddOnCard25Props } from './request-add-on-card-25.types';
import './request-add-on-card-25.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const RequestAddOnCard25: React.FC<RequestAddOnCard25Props> = ({
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
    'ui-request-add-on-card-25',
    `ui-request-add-on-card-25--${size}`,
    `ui-request-add-on-card-25--${variant}`,
    fullWidth && 'ui-request-add-on-card-25--full-width',
    isDisabled && 'ui-request-add-on-card-25--disabled',
    loading && 'ui-request-add-on-card-25--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-request-add-on-card-25__spinner" aria-hidden="true" />}
      <span className="ui-request-add-on-card-25__content">{children}</span>
    </div>
  );
};

export default RequestAddOnCard25;
