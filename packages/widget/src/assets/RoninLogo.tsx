import { ImgHTMLAttributes } from 'react';

import { roninLogoUri } from './data-uris';

export const RoninLogo = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  return <img width={24} height={24} src={roninLogoUri} {...props} />;
};
