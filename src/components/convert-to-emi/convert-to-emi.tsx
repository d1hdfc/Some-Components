// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { ConvertToEmiProps } from './convert-to-emi.types';
import './convert-to-emi.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const ConvertToEmi: React.FC<ConvertToEmiProps> = ({
  children = '10:00',
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
    'ui-convert-to-emi',
    `ui-convert-to-emi--${size}`,
    `ui-convert-to-emi--${variant}`,
    fullWidth && 'ui-convert-to-emi--full-width',
    isDisabled && 'ui-convert-to-emi--disabled',
    loading && 'ui-convert-to-emi--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-convert-to-emi__spinner" aria-hidden="true" />}
      <span className="ui-convert-to-emi__content">{children}</span>
    </div>
  );
};

export default ConvertToEmi;
