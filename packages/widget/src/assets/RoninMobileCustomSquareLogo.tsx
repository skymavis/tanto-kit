import { ImgHTMLAttributes } from 'react';

import { roninMobileCustomSquareLogoUri } from './data-uris';

export function RoninMobileCustomSquareLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img width={86} height={86} src={roninMobileCustomSquareLogoUri} {...props} />;
}
