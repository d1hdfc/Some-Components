// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { HdfcLogoProps } from './hdfc-logo.types';
import './hdfc-logo.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const HdfcLogo: React.FC<HdfcLogoProps> = ({
  children = 'Component',
  size = 'medium',
  variant = 'main',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const combinedClasses = cx(
    'ui-hdfc-logo',
    `ui-hdfc-logo--${size}`,
    `ui-hdfc-logo--${variant}`,
    fullWidth && 'ui-hdfc-logo--full-width',
    isDisabled && 'ui-hdfc-logo--disabled',
    loading && 'ui-hdfc-logo--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-hdfc-logo__spinner" aria-hidden="true" />}
      <span className="ui-hdfc-logo__content">{children}</span>
    </div>
  );
};

export default HdfcLogo;
