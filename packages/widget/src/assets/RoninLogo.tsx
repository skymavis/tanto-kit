import { ImgHTMLAttributes } from 'react';

import { roninLogoUri } from './dataUris';

export const RoninLogo = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  return <img width={24} height={24} src={roninLogoUri} {...props} />;
};
