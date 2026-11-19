// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { PartnerLogoMasterProps } from './partner-logo-master.types';
import './partner-logo-master.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const PartnerLogoMaster: React.FC<PartnerLogoMasterProps> = ({
  children = 'Component',
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
    'ui-partner-logo-master',
    `ui-partner-logo-master--${size}`,
    `ui-partner-logo-master--${variant}`,
    fullWidth && 'ui-partner-logo-master--full-width',
    isDisabled && 'ui-partner-logo-master--disabled',
    loading && 'ui-partner-logo-master--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-partner-logo-master__spinner" aria-hidden="true" />}
      <span className="ui-partner-logo-master__content">{children}</span>
    </div>
  );
};

export default PartnerLogoMaster;
