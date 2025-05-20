import { ImgHTMLAttributes } from 'react';

import { roninExtensionCustomSquareLogoUri } from './data-uris';

export function RoninExtensionCustomSquareLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img width={86} height={86} src={roninExtensionCustomSquareLogoUri} {...props} />;
}
