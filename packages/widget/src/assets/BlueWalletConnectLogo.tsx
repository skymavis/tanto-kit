import type { ImgHTMLAttributes } from 'react';

import { blueFilledWCLogoUri } from './dataUris';

export function BlueFilledWalletConnectLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={blueFilledWCLogoUri} {...props} />;
}
