// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { TokenNamePillProps } from './token-name-pill.types';
import './token-name-pill.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const TokenNamePill: React.FC<TokenNamePillProps> = ({
  children = 'input-field/text-color/placeholder',
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
    'ui-token-name-pill',
    `ui-token-name-pill--${size}`,
    `ui-token-name-pill--${variant}`,
    fullWidth && 'ui-token-name-pill--full-width',
    isDisabled && 'ui-token-name-pill--disabled',
    loading && 'ui-token-name-pill--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-token-name-pill__spinner" aria-hidden="true" />}
      <span className="ui-token-name-pill__content">{children}</span>
    </div>
  );
};

export default TokenNamePill;
