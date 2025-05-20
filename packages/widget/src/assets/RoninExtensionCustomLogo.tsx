import { ImgHTMLAttributes } from 'react';

import { roninExtensionCustomLogoUri } from './data-uris';

export function RoninExtensionCustomLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img width={32} height={32} src={roninExtensionCustomLogoUri} {...props} />;
}
