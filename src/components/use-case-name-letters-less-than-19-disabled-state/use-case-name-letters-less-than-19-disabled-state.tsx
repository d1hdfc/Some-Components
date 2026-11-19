// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { UseCaseNameLettersLessThan19DisabledStateProps } from './use-case-name-letters-less-than-19-disabled-state.types';
import './use-case-name-letters-less-than-19-disabled-state.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const UseCaseNameLettersLessThan19DisabledState: React.FC<UseCaseNameLettersLessThan19DisabledStateProps> = ({
  children = '123412******9211',
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
    'ui-use-case-name-letters-less-than-19-disabled-state',
    `ui-use-case-name-letters-less-than-19-disabled-state--${size}`,
    `ui-use-case-name-letters-less-than-19-disabled-state--${variant}`,
    fullWidth && 'ui-use-case-name-letters-less-than-19-disabled-state--full-width',
    isDisabled && 'ui-use-case-name-letters-less-than-19-disabled-state--disabled',
    loading && 'ui-use-case-name-letters-less-than-19-disabled-state--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-use-case-name-letters-less-than-19-disabled-state__spinner" aria-hidden="true" />}
      <span className="ui-use-case-name-letters-less-than-19-disabled-state__content">{children}</span>
    </div>
  );
};

export default UseCaseNameLettersLessThan19DisabledState;
