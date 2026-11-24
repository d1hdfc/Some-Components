import React from 'react';

export type ButtonCopySize = 'xsmall' | 'small' | 'medium' | 'large';

export type ButtonCopyVariant = 'primary' | 'secondary' | 'tertiary' | 'link';

export type ButtonCopyState = 'default' | 'hover' | 'pressed' | 'disabled' | 'focus';

export type ButtonCopyVisualType = 'default' | 'icon' | 'gradient' | 'white';

export interface ButtonCopyProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children?: React.ReactNode;
  size?: ButtonCopySize;
  variant?: ButtonCopyVariant;
  state?: ButtonCopyState;
  type?: ButtonCopyVisualType | 'button' | 'submit' | 'reset';
  buttonType?: ButtonCopyVisualType;
  leftIcon?: boolean | React.ReactNode;
  rightIcon?: boolean | React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  selected?: boolean;
  fullWidth?: boolean;
}
