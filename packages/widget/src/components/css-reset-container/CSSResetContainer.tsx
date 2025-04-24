import styled from '@emotion/styled';

export const CSSResetContainer = styled.div(({ theme }) => ({
  fontFamily: `${theme.fontFamily}, 'Work Sans', sans-serif`,
  color: theme.textColor,
  fontSize: 16,

  '& *': {
    boxSizing: 'border-box',
    outline: 'none',
    border: 'none',
  },

  '& [data-scrollable]': {
    '&::-webkit-scrollbar': {
      width: '4px',
      height: '4px',
      backgroundColor: theme.backgroundColor,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.thumbBackgroundColor,
      borderRadius: '10px',
    },

    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
  },
}));
