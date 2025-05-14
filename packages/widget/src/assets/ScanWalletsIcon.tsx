import { ImgHTMLAttributes } from 'react';

import { scanWalletsIconUri } from './data-uris';

export const ScanWalletsIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  return <img width={31} height={31} src={scanWalletsIconUri} {...props} />;
};
