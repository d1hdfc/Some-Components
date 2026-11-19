// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { TooltipProps } from './tooltip.types';
import './tooltip.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Tooltip: React.FC<TooltipProps> = ({
  children = 'Tooltip Header',
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
    'ui-tooltip',
    `ui-tooltip--${size}`,
    `ui-tooltip--${variant}`,
    fullWidth && 'ui-tooltip--full-width',
    isDisabled && 'ui-tooltip--disabled',
    loading && 'ui-tooltip--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-tooltip__spinner" aria-hidden="true" />}
      <span className="ui-tooltip__content">{children}</span>
    </div>
  );
};

export default Tooltip;
