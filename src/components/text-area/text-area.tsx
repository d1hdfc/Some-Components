// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { TextAreaProps } from './text-area.types';
import './text-area.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const TextArea: React.FC<TextAreaProps> = ({
  children = 'TextArea',
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
    'ui-text-area',
    `ui-text-area--${size}`,
    `ui-text-area--${variant}`,
    fullWidth && 'ui-text-area--full-width',
    isDisabled && 'ui-text-area--disabled',
    loading && 'ui-text-area--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-text-area__spinner" aria-hidden="true" />}
      <span className="ui-text-area__content">{children}</span>
    </div>
  );
};

export default TextArea;
