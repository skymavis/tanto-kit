import type { ImgHTMLAttributes } from 'react';

import { hourglassUri } from './dataUris';

export function Hourglass(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img width={74} height={111} src={hourglassUri} {...props} />;
}
