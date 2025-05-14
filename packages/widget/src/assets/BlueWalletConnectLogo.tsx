import { ImgHTMLAttributes } from 'react';

import { blueFilledWCLogoUri } from './data-uris';

export function BlueFilledWalletConnectLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={blueFilledWCLogoUri} {...props} />;
}
