// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { BubbleProps } from './bubble.types';
import './bubble.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Bubble: React.FC<BubbleProps> = ({
  children = '186',
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
    'ui-bubble',
    `ui-bubble--${size}`,
    `ui-bubble--${variant}`,
    fullWidth && 'ui-bubble--full-width',
    isDisabled && 'ui-bubble--disabled',
    loading && 'ui-bubble--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-bubble__spinner" aria-hidden="true" />}
      <span className="ui-bubble__content">{children}</span>
    </div>
  );
};

export default Bubble;
