import '@emotion/react';

import type { TantoWidgetThemeTokens } from './src/types/theme';

declare module '@emotion/react' {
  interface Theme extends TantoWidgetThemeTokens {}
}
