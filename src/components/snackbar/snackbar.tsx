// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { SnackbarProps } from './snackbar.types';
import './snackbar.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Snackbar: React.FC<SnackbarProps> = ({
  children = 'Single line message',
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
    'ui-snackbar',
    `ui-snackbar--${size}`,
    `ui-snackbar--${variant}`,
    fullWidth && 'ui-snackbar--full-width',
    isDisabled && 'ui-snackbar--disabled',
    loading && 'ui-snackbar--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-snackbar__spinner" aria-hidden="true" />}
      <span className="ui-snackbar__content">{children}</span>
    </div>
  );
};

export default Snackbar;
