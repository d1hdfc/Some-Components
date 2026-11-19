// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { ContentProps } from './content.types';
import './content.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Content: React.FC<ContentProps> = ({
  children = 'Title',
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
    'ui-content',
    `ui-content--${size}`,
    `ui-content--${variant}`,
    fullWidth && 'ui-content--full-width',
    isDisabled && 'ui-content--disabled',
    loading && 'ui-content--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-content__spinner" aria-hidden="true" />}
      <span className="ui-content__content">{children}</span>
    </div>
  );
};

export default Content;
