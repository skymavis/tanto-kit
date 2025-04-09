import { css, Global, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { dark, light } from '../styles/theme';
import type { ThemeMode } from '../types/theme';

interface ThemeProviderProps {
  children: ReactNode;
  theme?: ThemeMode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, theme: initialTheme = 'dark' } = props;
  const [theme] = useState(initialTheme === 'light' ? light : dark);

  return (
    <EmotionThemeProvider theme={theme}>
      <Global
        styles={css`
          @font-face {
            font-family: 'Work Sans';
            font-style: normal;
            font-weight: 100 900;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/worksans/v19/QGYsz_wNahGAdqQ43Rh_fKDptfpA4Q.woff2') format('woff2');
          }
        `}
      />
      <Global
        styles={css`
          * {
            font-family: ${theme.fontFamily};
            color: ${theme.textColor};
          }
        `}
      />
      <Global
        styles={css`
          ::-webkit-scrollbar {
            -webkit-appearance: none;
            background-color: ${theme.backgroundColor};
            width: 4px;
            height: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: ${theme.thumbBackgroundColor};
            border-radius: 10px;
          }

          ::-webkit-scrollbar-corner {
            background-color: transparent;
          }
        `}
      />
      {children}
    </EmotionThemeProvider>
  );
}
