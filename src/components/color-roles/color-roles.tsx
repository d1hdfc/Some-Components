// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { ColorRolesProps } from './color-roles.types';
import './color-roles.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const ColorRoles: React.FC<ColorRolesProps> = ({
  children = 'Brand',
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
    'ui-color-roles',
    `ui-color-roles--${size}`,
    `ui-color-roles--${variant}`,
    fullWidth && 'ui-color-roles--full-width',
    isDisabled && 'ui-color-roles--disabled',
    loading && 'ui-color-roles--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-color-roles__spinner" aria-hidden="true" />}
      <span className="ui-color-roles__content">{children}</span>
    </div>
  );
};

export default ColorRoles;
