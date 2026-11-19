// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { RequestAddOnCard3Props } from './request-add-on-card-3.types';
import './request-add-on-card-3.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const RequestAddOnCard3: React.FC<RequestAddOnCard3Props> = ({
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
    'ui-request-add-on-card-3',
    `ui-request-add-on-card-3--${size}`,
    `ui-request-add-on-card-3--${variant}`,
    fullWidth && 'ui-request-add-on-card-3--full-width',
    isDisabled && 'ui-request-add-on-card-3--disabled',
    loading && 'ui-request-add-on-card-3--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-request-add-on-card-3__spinner" aria-hidden="true" />}
      <span className="ui-request-add-on-card-3__content">{children}</span>
    </div>
  );
};

export default RequestAddOnCard3;
