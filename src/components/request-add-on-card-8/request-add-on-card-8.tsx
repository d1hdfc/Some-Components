// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { RequestAddOnCard8Props } from './request-add-on-card-8.types';
import './request-add-on-card-8.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const RequestAddOnCard8: React.FC<RequestAddOnCard8Props> = ({
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
    'ui-request-add-on-card-8',
    `ui-request-add-on-card-8--${size}`,
    `ui-request-add-on-card-8--${variant}`,
    fullWidth && 'ui-request-add-on-card-8--full-width',
    isDisabled && 'ui-request-add-on-card-8--disabled',
    loading && 'ui-request-add-on-card-8--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-request-add-on-card-8__spinner" aria-hidden="true" />}
      <span className="ui-request-add-on-card-8__content">{children}</span>
    </div>
  );
};

export default RequestAddOnCard8;
