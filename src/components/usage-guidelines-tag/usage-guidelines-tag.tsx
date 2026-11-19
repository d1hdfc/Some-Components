// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { UsageGuidelinesTagProps } from './usage-guidelines-tag.types';
import './usage-guidelines-tag.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const UsageGuidelinesTag: React.FC<UsageGuidelinesTagProps> = ({
  children = 'Account Balance',
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
    'ui-usage-guidelines-tag',
    `ui-usage-guidelines-tag--${size}`,
    `ui-usage-guidelines-tag--${variant}`,
    fullWidth && 'ui-usage-guidelines-tag--full-width',
    isDisabled && 'ui-usage-guidelines-tag--disabled',
    loading && 'ui-usage-guidelines-tag--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-usage-guidelines-tag__spinner" aria-hidden="true" />}
      <span className="ui-usage-guidelines-tag__content">{children}</span>
    </div>
  );
};

export default UsageGuidelinesTag;
