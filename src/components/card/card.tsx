// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { CardProps } from './card.types';
import './card.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Card: React.FC<CardProps> = ({
  children = 'Replace me with component',
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
    'ui-card',
    `ui-card--${size}`,
    `ui-card--${variant}`,
    fullWidth && 'ui-card--full-width',
    isDisabled && 'ui-card--disabled',
    loading && 'ui-card--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-card__spinner" aria-hidden="true" />}
      <span className="ui-card__content">{children}</span>
    </div>
  );
};

export default Card;
