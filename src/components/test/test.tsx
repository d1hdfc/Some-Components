// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { TestProps } from './test.types';
import './test.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Test: React.FC<TestProps> = ({
  children = 'Badge',
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
    'ui-test',
    `ui-test--${size}`,
    `ui-test--${variant}`,
    fullWidth && 'ui-test--full-width',
    isDisabled && 'ui-test--disabled',
    loading && 'ui-test--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-test__spinner" aria-hidden="true" />}
      <span className="ui-test__content">{children}</span>
    </div>
  );
};

export default Test;
