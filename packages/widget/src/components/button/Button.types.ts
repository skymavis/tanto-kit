import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonIntent = 'primary' | 'secondary';
type ButtonVariant = 'default' | 'plain';
type ButtonShape = 'rounded' | 'square' | 'lessrounded';
type ButtonSize = 'large' | 'default' | 'small' | 'xsmall';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: ButtonIntent;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export type IconButtonProps = Omit<ButtonProps, 'children' | 'shape' | 'fullWidth'> & {
  icon: ReactNode;
};
