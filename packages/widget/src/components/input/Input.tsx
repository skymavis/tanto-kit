import { useTheme } from '@emotion/react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { InfoFillIcon } from '../../assets/InfoFillIcon';
import type { EmotionCSS } from '../../types/theme';
import { Box } from '../box/Box';
import { InputWrapper, StyledCaption, StyledError, StyledInput, StyledLabel } from './Input.styles';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
  label?: string;
  caption?: string;
  error?: string | null;
  value: string;
  onChange: (value: string) => void;
  css?: EmotionCSS;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, autoFocus, caption, error, value, onChange, className, style, css, ...rest }, ref) => {
    const theme = useTheme();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      onChange(value);
    };

    return (
      <Box className={className} style={style} css={css} fullWidth vertical gap={8}>
        {label && <StyledLabel>{label}</StyledLabel>}
        <InputWrapper align="center" gap={8}>
          <StyledInput
            ref={ref}
            {...rest}
            autoFocus={autoFocus}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        </InputWrapper>
        {error && <StyledError>{error}</StyledError>}
        {caption && !error && (
          <Box gap={8}>
            <div css={{ marginTop: 4 }}>
              <InfoFillIcon color={theme.mutedText} />
            </div>
            <StyledCaption>{caption}</StyledCaption>
          </Box>
        )}
      </Box>
    );
  },
);
