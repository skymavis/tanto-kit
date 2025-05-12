import styled from '@emotion/styled';

export const CSSReset = styled.div(({ theme }) => ({
  all: 'initial',
  textAlign: 'left',
  textRendering: 'optimizeLegibility',
  MozOsxFontSmoothing: 'grayscale',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  WebkitTextStroke: '0.001px transparent',
  textSizeAdjust: 'none',
  fontSize: theme.fontSize,
  fontWeight: 400,
  lineHeight: 1.25,
  color: theme.colors.foreground,

  '&, *': {
    fontFamily: `${theme.fontFamily}, 'Work Sans', sans-serif`,
    boxSizing: 'border-box',
    outline: 'none',
    border: 'none',
  },

  '*, *:before, *:after': {
    margin: 0,
  },

  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
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
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.colors.scrollbarThumb} ${theme.colors.scrollbarTrack}`,

    '&::-webkit-scrollbar': {
      width: 4,
      height: 4,
      backgroundColor: theme.colors.scrollbarTrack,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.colors.scrollbarThumb,
      borderRadius: 10,
    },

    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
  },
}));
