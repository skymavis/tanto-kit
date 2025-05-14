import { ImgHTMLAttributes } from 'react';

import { roninWaypointCustomSquareLogoUri } from './data-uris';

export function RoninWaypointCustomSquareLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img width={86} height={86} src={roninWaypointCustomSquareLogoUri} {...props} />;
}
