// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { ProtoProps } from './proto.types';
import './proto.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Proto: React.FC<ProtoProps> = ({
  children = '12:30',
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
    'ui-proto',
    `ui-proto--${size}`,
    `ui-proto--${variant}`,
    fullWidth && 'ui-proto--full-width',
    isDisabled && 'ui-proto--disabled',
    loading && 'ui-proto--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-proto__spinner" aria-hidden="true" />}
      <span className="ui-proto__content">{children}</span>
    </div>
  );
};

export default Proto;
