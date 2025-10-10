import type { ImgHTMLAttributes } from 'react';

import { highFiveUri } from './dataUris';

export function HighFive(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img width={120} height={120} src={highFiveUri} {...props} />;
}
