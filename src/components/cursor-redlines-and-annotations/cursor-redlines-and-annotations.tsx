// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { CursorRedlinesAndAnnotationsProps } from './cursor-redlines-and-annotations.types';
import './cursor-redlines-and-annotations.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const CursorRedlinesAndAnnotations: React.FC<CursorRedlinesAndAnnotationsProps> = ({
  children = 'Component',
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
    'ui-cursor-redlines-and-annotations',
    `ui-cursor-redlines-and-annotations--${size}`,
    `ui-cursor-redlines-and-annotations--${variant}`,
    fullWidth && 'ui-cursor-redlines-and-annotations--full-width',
    isDisabled && 'ui-cursor-redlines-and-annotations--disabled',
    loading && 'ui-cursor-redlines-and-annotations--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-cursor-redlines-and-annotations__spinner" aria-hidden="true" />}
      <span className="ui-cursor-redlines-and-annotations__content">{children}</span>
    </div>
  );
};

export default CursorRedlinesAndAnnotations;
