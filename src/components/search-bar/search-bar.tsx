// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { SearchBarProps } from './search-bar.types';
import './search-bar.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const SearchBar: React.FC<SearchBarProps> = ({
  children = 'SearchBar',
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
    'ui-search-bar',
    `ui-search-bar--${size}`,
    `ui-search-bar--${variant}`,
    fullWidth && 'ui-search-bar--full-width',
    isDisabled && 'ui-search-bar--disabled',
    loading && 'ui-search-bar--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-search-bar__spinner" aria-hidden="true" />}
      <span className="ui-search-bar__content">{children}</span>
    </div>
  );
};

export default SearchBar;
