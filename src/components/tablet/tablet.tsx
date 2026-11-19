// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { TabletProps } from './tablet.types';
import './tablet.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Tablet: React.FC<TabletProps> = ({
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
    'ui-tablet',
    `ui-tablet--${size}`,
    `ui-tablet--${variant}`,
    fullWidth && 'ui-tablet--full-width',
    isDisabled && 'ui-tablet--disabled',
    loading && 'ui-tablet--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-tablet__spinner" aria-hidden="true" />}
      <span className="ui-tablet__content">{children}</span>
    </div>
  );
};

export default Tablet;
