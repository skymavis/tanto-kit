import styled from '@emotion/styled';

export const CSSReset = styled.div(({ theme }) => ({
  fontFamily: `${theme.fontFamily}, 'Work Sans', sans-serif`,
  color: theme.foregroundColor,
  fontSize: 16,

  '*': {
    margin: 0,
    boxSizing: 'border-box',
    outline: 'none',
    border: 'none',
  },

  '*:before, *:after': {
    borderWidth: 0,
  },

  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },

  'input, button, textarea, select': {
    font: 'inherit',
  },

  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },

  p: {
    textWrap: 'pretty',
  },

  'h1, h2, h3, h4, h5, h6': {
    textWrap: 'balance',
  },

  a: {
    textDecoration: 'none',
  },

  '& [data-scrollable]': {
    '&::-webkit-scrollbar': {
      width: 4,
      height: 4,
      backgroundColor: theme.backgroundColor,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.thumbBackgroundColor,
      borderRadius: 10,
    },

    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
  },
}));
