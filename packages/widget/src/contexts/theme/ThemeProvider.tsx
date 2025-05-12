import { type Theme, css, Global, ThemeProvider as EmotionThemeProvider, useTheme } from '@emotion/react';
import merge from 'lodash.merge';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { tantoDarkTheme } from '../../styles/theme';

interface ThemeProviderProps {
  children: ReactNode;
  theme?: DeepPartial<Theme>;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, theme: initialTheme = tantoDarkTheme } = props;
  const theme = useMemo(() => merge(tantoDarkTheme, initialTheme), [initialTheme]);

  return (
    <EmotionThemeProvider theme={theme}>
      <DefaultFontLoader />
      {children}
    </EmotionThemeProvider>
  );
}

function DefaultFontLoader() {
  const theme = useTheme();

  if (!theme.fontFamily.includes('Work Sans')) {
    return null;
  }

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
