// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { ExamplesProps } from './examples.types';
import './examples.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Examples: React.FC<ExamplesProps> = ({
  children = 'Examples',
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
    'ui-examples',
    `ui-examples--${size}`,
    `ui-examples--${variant}`,
    fullWidth && 'ui-examples--full-width',
    isDisabled && 'ui-examples--disabled',
    loading && 'ui-examples--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-examples__spinner" aria-hidden="true" />}
      <span className="ui-examples__content">{children}</span>
    </div>
  );
};

export default Examples;
