// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { UsageGuidelineTagProps } from './usage-guideline-tag.types';
import './usage-guideline-tag.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const UsageGuidelineTag: React.FC<UsageGuidelineTagProps> = ({
  children = 'Recommended',
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
    'ui-usage-guideline-tag',
    `ui-usage-guideline-tag--${size}`,
    `ui-usage-guideline-tag--${variant}`,
    fullWidth && 'ui-usage-guideline-tag--full-width',
    isDisabled && 'ui-usage-guideline-tag--disabled',
    loading && 'ui-usage-guideline-tag--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-usage-guideline-tag__spinner" aria-hidden="true" />}
      <span className="ui-usage-guideline-tag__content">{children}</span>
    </div>
  );
};

export default UsageGuidelineTag;
