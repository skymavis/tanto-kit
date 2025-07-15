import { css, Global, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';

import type { TantoWidgetTheme } from '../../types/theme';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export interface ThemeProviderProps {
  theme?: TantoWidgetTheme;
}

export function ThemeProvider(props: PropsWithChildren<ThemeProviderProps>) {
  const { children, theme = 'dark' } = props;

  const normalizedTheme = useMemo(() => {
    const isThemeString = typeof theme === 'string';
    if (isThemeString) return theme === 'dark' ? darkTheme() : lightTheme();
    return theme;
  }, [theme]);

  return (
    <EmotionThemeProvider theme={normalizedTheme}>
      <DefaultFontLoader />
      {children}
    </EmotionThemeProvider>
  );
}

function DefaultFontLoader() {
  return (
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
  );
}
