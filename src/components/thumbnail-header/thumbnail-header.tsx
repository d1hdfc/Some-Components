// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { ThumbnailHeaderProps } from './thumbnail-header.types';
import './thumbnail-header.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const ThumbnailHeader: React.FC<ThumbnailHeaderProps> = ({
  children = 'Components & Organisms',
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
    'ui-thumbnail-header',
    `ui-thumbnail-header--${size}`,
    `ui-thumbnail-header--${variant}`,
    fullWidth && 'ui-thumbnail-header--full-width',
    isDisabled && 'ui-thumbnail-header--disabled',
    loading && 'ui-thumbnail-header--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-thumbnail-header__spinner" aria-hidden="true" />}
      <span className="ui-thumbnail-header__content">{children}</span>
    </div>
  );
};

export default ThumbnailHeader;
