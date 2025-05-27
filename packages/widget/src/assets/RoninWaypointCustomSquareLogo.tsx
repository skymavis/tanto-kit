import styled from '@emotion/styled';
import { ImgHTMLAttributes } from 'react';

import { roninWaypointCustomSquareLogoUri } from './data-uris';
import { RoninBadge as RoninBadgeSvg } from './RoninBadge';

const WalletLogoWrapper = styled.div({
  position: 'relative',
});

const RoninBadge = styled(RoninBadgeSvg)({
  position: 'absolute',
  width: 28,
  height: 28,
  top: 6,
  left: 6,
});

export function RoninWaypointCustomSquareLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <WalletLogoWrapper>
      <img width={90} height={90} src={roninWaypointCustomSquareLogoUri} {...props} />
      <RoninBadge />
    </WalletLogoWrapper>
  );
}
