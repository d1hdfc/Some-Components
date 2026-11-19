// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { VariablesProps } from './variables.types';
import './variables.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Variables: React.FC<VariablesProps> = ({
  children = 'Variables',
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
    'ui-variables',
    `ui-variables--${size}`,
    `ui-variables--${variant}`,
    fullWidth && 'ui-variables--full-width',
    isDisabled && 'ui-variables--disabled',
    loading && 'ui-variables--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-variables__spinner" aria-hidden="true" />}
      <span className="ui-variables__content">{children}</span>
    </div>
  );
};

export default Variables;
