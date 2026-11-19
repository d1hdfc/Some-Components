// Generated from Figma by scripts/code-generator.cjs.
import React from 'react';
import type { KycPreferenceAadhaarProps } from './kyc-preference-aadhaar.types';
import './kyc-preference-aadhaar.scss';

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export const KycPreferenceAadhaar: React.FC<KycPreferenceAadhaarProps> = ({
  children = 'Aadhaar e-KYC',
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
    'ui-kyc-preference-aadhaar',
    `ui-kyc-preference-aadhaar--${size}`,
    `ui-kyc-preference-aadhaar--${variant}`,
    fullWidth && 'ui-kyc-preference-aadhaar--full-width',
    isDisabled && 'ui-kyc-preference-aadhaar--disabled',
    loading && 'ui-kyc-preference-aadhaar--loading',
    className
  );

  return (
    <div
      {...rest}
      className={combinedClasses}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ui-kyc-preference-aadhaar__spinner" aria-hidden="true" />}
      <span className="ui-kyc-preference-aadhaar__content">{children}</span>
    </div>
  );
};

export default KycPreferenceAadhaar;
