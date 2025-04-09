import '@emotion/react';

import type { WidgetTheme } from './src/types/theme';

declare module '@emotion/react' {
  interface Theme extends WidgetTheme {}
}
