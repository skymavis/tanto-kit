import '@emotion/react';

import type { TantoWidgetTheme } from './src/types/theme';

declare module '@emotion/react' {
  interface Theme extends TantoWidgetTheme {}
}
