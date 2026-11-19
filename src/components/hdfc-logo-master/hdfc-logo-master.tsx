// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { HdfcLogoMasterProps } from './hdfc-logo-master.types';
import './hdfc-logo-master.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const HdfcLogoMaster: React.FC<HdfcLogoMasterProps> = ({
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
    'ui-hdfc-logo-master',
    `ui-hdfc-logo-master--${size}`,
    `ui-hdfc-logo-master--${variant}`,
    fullWidth && 'ui-hdfc-logo-master--full-width',
    isDisabled && 'ui-hdfc-logo-master--disabled',
    loading && 'ui-hdfc-logo-master--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-hdfc-logo-master__spinner" aria-hidden="true" />}
      <span className="ui-hdfc-logo-master__content">{children}</span>
    </div>
  );
};

export default HdfcLogoMaster;
