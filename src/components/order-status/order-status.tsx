// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { OrderStatusProps } from './order-status.types';
import './order-status.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const OrderStatus: React.FC<OrderStatusProps> = ({
  children = '10:00',
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
    'ui-order-status',
    `ui-order-status--${size}`,
    `ui-order-status--${variant}`,
    fullWidth && 'ui-order-status--full-width',
    isDisabled && 'ui-order-status--disabled',
    loading && 'ui-order-status--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-order-status__spinner" aria-hidden="true" />}
      <span className="ui-order-status__content">{children}</span>
    </div>
  );
};

export default OrderStatus;
