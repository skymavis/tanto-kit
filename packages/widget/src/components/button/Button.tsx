import { Spinner } from '../spinner/Spinner';
import { StyledButton, StyledIconButton } from './Button.styles';
import type { ButtonProps, IconButtonProps } from './Button.types';

export function Button({
  intent = 'primary',
  variant = 'default',
  shape = 'rounded',
  size = 'default',
  children,
  disabled = false,
  loading = false,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton disabled={disabled || loading} intent={intent} variant={variant} shape={shape} size={size} {...rest}>
      {loading ? <Spinner size={size} /> : children}
    </StyledButton>
  );
}

export function IconButton({
  intent = 'primary',
  variant = 'default',
  size = 'default',
  icon,
  ...rest
}: IconButtonProps) {
  return (
    <StyledIconButton intent={intent} variant={variant} size={size} {...rest}>
      {icon}
    </StyledIconButton>
  );
}
