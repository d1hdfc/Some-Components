// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { TokenNameProps } from './token-name.types';
import './token-name.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const TokenName: React.FC<TokenNameProps> = ({
  children = 'Default',
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
    'ui-token-name',
    `ui-token-name--${size}`,
    `ui-token-name--${variant}`,
    fullWidth && 'ui-token-name--full-width',
    isDisabled && 'ui-token-name--disabled',
    loading && 'ui-token-name--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-token-name__spinner" aria-hidden="true" />}
      <span className="ui-token-name__content">{children}</span>
    </div>
  );
};

export default TokenName;
