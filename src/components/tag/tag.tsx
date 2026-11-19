// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { TagProps } from './tag.types';
import './tag.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Tag: React.FC<TagProps> = ({
  children = '0',
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
    'ui-tag',
    `ui-tag--${size}`,
    `ui-tag--${variant}`,
    fullWidth && 'ui-tag--full-width',
    isDisabled && 'ui-tag--disabled',
    loading && 'ui-tag--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-tag__spinner" aria-hidden="true" />}
      <span className="ui-tag__content">{children}</span>
    </div>
  );
};

export default Tag;
