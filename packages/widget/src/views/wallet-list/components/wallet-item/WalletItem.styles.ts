import styled from '@emotion/styled';

import { highlightedWalletItemBackgroundUri } from '../../../../assets/dataUris';
import { RoninBadge as RoninBadgeSvg } from '../../../../assets/RoninBadge';
import { WALLET_ITEM_HEIGHT } from '../../../../constants';

export const Container = styled.div<{
  highlight?: boolean;
  disabled?: boolean;
}>(
  {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: WALLET_ITEM_HEIGHT,
    gap: 12,
    padding: 16,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background 100ms ease',
  },
  ({ theme }) => ({
    backgroundColor: theme.listItemBackground,
    '&:hover': {
      backgroundColor: theme.listItemHoverBackground,
    },
  }),
  ({ disabled, highlight, theme }) => {
    if (disabled) {
      return {
        pointerEvents: 'none',
        backgroundColor: 'rgba(205, 213, 229, 0.03)',
      };
    }
    if (highlight) {
      return {
        backgroundColor: 'unset',
        backgroundImage: `url("${
          theme.mode === 'dark' ? highlightedWalletItemBackgroundUri.dark : highlightedWalletItemBackgroundUri.light
        }")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&:hover': {
          backgroundColor: 'unset',
          backgroundImage: `url("${
            theme.mode === 'dark'
              ? highlightedWalletItemBackgroundUri.darkHover
              : highlightedWalletItemBackgroundUri.lightHover
          }")`,
        },
      };
    }
  },
);

export const WalletName = styled.p<{ disabled?: boolean }>(
  {
    fontSize: '1em',
    lineHeight: '1.25em',
    margin: 0,
  },
  ({ disabled, theme }) => disabled && { color: theme.mutedText },
);

export const WalletDescription = styled.p(({ theme }) => ({
  fontSize: '0.75em',
  lineHeight: '1em',
  color: theme.mutedText,
  margin: 0,
}));

export const WalletLogoWrapper = styled.div({
  position: 'relative',
  '> svg:not(.ronin-badge), > img': {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
});

export const RoninBadge = styled(RoninBadgeSvg)({
  position: 'absolute',
  right: -6,
  bottom: -6,
});
