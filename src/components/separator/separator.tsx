// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { SeparatorProps } from './separator.types';
import './separator.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Separator: React.FC<SeparatorProps> = ({
  children = 'Separator',
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
    'ui-separator',
    `ui-separator--${size}`,
    `ui-separator--${variant}`,
    fullWidth && 'ui-separator--full-width',
    isDisabled && 'ui-separator--disabled',
    loading && 'ui-separator--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-separator__spinner" aria-hidden="true" />}
      <span className="ui-separator__content">{children}</span>
    </div>
  );
};

export default Separator;
