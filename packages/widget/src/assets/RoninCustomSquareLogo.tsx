import styled from '@emotion/styled';
import { ImgHTMLAttributes } from 'react';

import {
  roninExtensionCustomSquareLogoUri,
  roninMobileCustomSquareLogoUri,
  roninWaypointCustomSquareLogoUri,
} from './data-uris';
import { RoninBadge as RoninBadgeSvg } from './RoninBadge';

const LOGO_SIZE = 90;

const WalletLogoWrapper = styled.div({
  position: 'relative',
  width: LOGO_SIZE,
  height: LOGO_SIZE,
});

const RoninBadgeWrapper = styled.div({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
});

const RoninBadge = styled(RoninBadgeSvg)({
  transform: 'translateX(22%) translateY(22%)',
  width: '32%',
  height: '32%',
});

export function RoninExtensionCustomSquareLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <WalletLogoWrapper>
      <img src={roninExtensionCustomSquareLogoUri} {...props} />
      <RoninBadgeWrapper>
        <RoninBadge />
      </RoninBadgeWrapper>
    </WalletLogoWrapper>
  );
}

export function RoninWaypointCustomSquareLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <WalletLogoWrapper>
      <img src={roninWaypointCustomSquareLogoUri} {...props} />
      <RoninBadgeWrapper>
        <RoninBadge />
      </RoninBadgeWrapper>
    </WalletLogoWrapper>
  );
}

export function RoninMobileCustomSquareLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <WalletLogoWrapper>
      <img src={roninMobileCustomSquareLogoUri} {...props} />
      <RoninBadgeWrapper>
        <RoninBadge />
      </RoninBadgeWrapper>
    </WalletLogoWrapper>
  );
}
