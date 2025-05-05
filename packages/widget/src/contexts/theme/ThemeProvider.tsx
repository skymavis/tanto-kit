import { type Theme, css, Global, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { tantoDarkTheme } from '../../styles/theme';

interface ThemeProviderProps {
  children: ReactNode;
  theme?: Theme;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, theme: initialTheme = tantoDarkTheme } = props;
  const [theme] = useState(initialTheme);

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
      {children}
    </EmotionThemeProvider>
  );
}
