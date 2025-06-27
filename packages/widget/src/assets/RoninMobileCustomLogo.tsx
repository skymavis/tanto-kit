import { ImgHTMLAttributes } from 'react';

import { roninMobileCustomLogoUri } from './dataUris';

export function RoninMobileCustomLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img width={32} height={32} src={roninMobileCustomLogoUri} {...props} />;
}
