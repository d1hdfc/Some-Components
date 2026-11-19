// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { NestedInstancesProps } from './nested-instances.types';
import './nested-instances.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const NestedInstances: React.FC<NestedInstancesProps> = ({
  children = 'Leading Area | Small',
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
    'ui-nested-instances',
    `ui-nested-instances--${size}`,
    `ui-nested-instances--${variant}`,
    fullWidth && 'ui-nested-instances--full-width',
    isDisabled && 'ui-nested-instances--disabled',
    loading && 'ui-nested-instances--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-nested-instances__spinner" aria-hidden="true" />}
      <span className="ui-nested-instances__content">{children}</span>
    </div>
  );
};

export default NestedInstances;
