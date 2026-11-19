// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { PreviewProps } from './preview.types';
import './preview.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Preview: React.FC<PreviewProps> = ({
  children = '•',
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
    'ui-preview',
    `ui-preview--${size}`,
    `ui-preview--${variant}`,
    fullWidth && 'ui-preview--full-width',
    isDisabled && 'ui-preview--disabled',
    loading && 'ui-preview--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-preview__spinner" aria-hidden="true" />}
      <span className="ui-preview__content">{children}</span>
    </div>
  );
};

export default Preview;
