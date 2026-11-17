// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { ToastProps } from './toast.types';
import './toast.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Toast: React.FC<ToastProps> = ({
  children = 'Toast',
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
    'ui-toast',
    `ui-toast--${size}`,
    `ui-toast--${variant}`,
    fullWidth && 'ui-toast--full-width',
    isDisabled && 'ui-toast--disabled',
    loading && 'ui-toast--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-toast__spinner" aria-hidden="true" />}
      <span className="ui-toast__content">{children}</span>
    </div>
  );
};

export default Toast;
