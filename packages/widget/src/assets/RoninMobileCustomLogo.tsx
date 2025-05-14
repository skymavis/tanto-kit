import { ImgHTMLAttributes } from 'react';

import { roninMobileCustomLogoUri } from './data-uris';

export function RoninMobileCustomLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img width={32} height={32} src={roninMobileCustomLogoUri} {...props} />;
}
