// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { RequestAddOnCard7Props } from './request-add-on-card-7.types';
import './request-add-on-card-7.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const RequestAddOnCard7: React.FC<RequestAddOnCard7Props> = ({
  children = '123412******9211',
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
    'ui-request-add-on-card-7',
    `ui-request-add-on-card-7--${size}`,
    `ui-request-add-on-card-7--${variant}`,
    fullWidth && 'ui-request-add-on-card-7--full-width',
    isDisabled && 'ui-request-add-on-card-7--disabled',
    loading && 'ui-request-add-on-card-7--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-request-add-on-card-7__spinner" aria-hidden="true" />}
      <span className="ui-request-add-on-card-7__content">{children}</span>
    </div>
  );
};

export default RequestAddOnCard7;
