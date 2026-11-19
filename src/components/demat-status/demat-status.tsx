// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { DematStatusProps } from './demat-status.types';
import './demat-status.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const DematStatus: React.FC<DematStatusProps> = ({
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
    'ui-demat-status',
    `ui-demat-status--${size}`,
    `ui-demat-status--${variant}`,
    fullWidth && 'ui-demat-status--full-width',
    isDisabled && 'ui-demat-status--disabled',
    loading && 'ui-demat-status--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-demat-status__spinner" aria-hidden="true" />}
      <span className="ui-demat-status__content">{children}</span>
    </div>
  );
};

export default DematStatus;
