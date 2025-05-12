import { css, Global, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { type ReactNode, useMemo } from 'react';

import { tantoDarkTheme, tantoLightTheme } from '../../styles/theme';
import type { WidgetTheme } from '../../types/theme';

interface ThemeProviderProps {
  children: ReactNode;
  theme?: WidgetTheme['name'];
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, theme: themeName = 'dark' } = props;
  const theme = useMemo(() => (themeName === 'dark' ? tantoDarkTheme : tantoLightTheme), [themeName]);

  return (
    <EmotionThemeProvider theme={theme}>
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
