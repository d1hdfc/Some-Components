// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { AliasRolesProps } from './alias-roles.types';
import './alias-roles.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const AliasRoles: React.FC<AliasRolesProps> = ({
  children = 'lighter',
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
    'ui-alias-roles',
    `ui-alias-roles--${size}`,
    `ui-alias-roles--${variant}`,
    fullWidth && 'ui-alias-roles--full-width',
    isDisabled && 'ui-alias-roles--disabled',
    loading && 'ui-alias-roles--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-alias-roles__spinner" aria-hidden="true" />}
      <span className="ui-alias-roles__content">{children}</span>
    </div>
  );
};

export default AliasRoles;
