// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { CarouselProps } from './carousel.types';
import './carousel.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const Carousel: React.FC<CarouselProps> = ({
  children = 'Carousel',
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
    'ui-carousel',
    `ui-carousel--${size}`,
    `ui-carousel--${variant}`,
    fullWidth && 'ui-carousel--full-width',
    isDisabled && 'ui-carousel--disabled',
    loading && 'ui-carousel--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-carousel__spinner" aria-hidden="true" />}
      <span className="ui-carousel__content">{children}</span>
    </div>
  );
};

export default Carousel;
