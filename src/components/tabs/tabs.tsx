// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { TabsProps } from './tabs.types';
import './tabs.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Tabs: React.FC<TabsProps> = ({
  children = 'Tabs',
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
    'ui-tabs',
    `ui-tabs--${size}`,
    `ui-tabs--${variant}`,
    fullWidth && 'ui-tabs--full-width',
    isDisabled && 'ui-tabs--disabled',
    loading && 'ui-tabs--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-tabs__spinner" aria-hidden="true" />}
      <span className="ui-tabs__content">{children}</span>
    </div>
  );
};

export default Tabs;
