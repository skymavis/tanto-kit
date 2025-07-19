import styled from '@emotion/styled';

import { Box } from '../box/Box';

export const InputWrapper = styled(Box)(
  {
    width: '100%',
    padding: '0 16px',
    transition: '150ms ease-in-out',
  },
  props => {
    const { theme } = props;
    return {
      borderRadius: theme.inputBorderRadius,
      backgroundColor: theme.inputBackgroundColor,
      border: `1px solid ${theme.inputBorderColor}`,
      '&:focus-within': {
        borderColor: theme.inputFocusBorderColor,
      },
    };
  },
);

export const StyledInput = styled.input({
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
  width: '100%',
  height: 44,
  fontSize: 16,
  padding: 0,
  margin: 0,
  '&:placeholder': {
    opacity: 0.4,
  },
});

export const StyledLabel = styled.p(
  {
    fontSize: 16,
  },
  props => {
    const { theme } = props;
    return {
      color: theme.mutedText,
    };
  },
);

export const StyledCaption = styled.p(
  {
    fontSize: 14,
  },
  props => {
    const { theme } = props;
    return {
      color: theme.mutedText,
    };
  },
);

export const StyledError = styled.p(
  {
    fontSize: 14,
  },
  props => {
    const { theme } = props;
    return {
      color: theme.errorColor,
    };
  },
);
