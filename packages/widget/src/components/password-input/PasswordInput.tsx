import styled from '@emotion/styled';
import { forwardRef, useState } from 'react';

import { EyeIcon } from '../../assets/EyeIcon';
import { EyeSlashIcon } from '../../assets/EyeSlashIcon';
import { Input, InputProps } from '../input/Input';

const EyeButton = styled.div({
  paddingLeft: 8,
  cursor: 'pointer',
});

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      ref={ref}
      {...props}
      secure={!showPassword}
      postfixIcon={
        <EyeButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
        </EyeButton>
      }
    />
  );
});
