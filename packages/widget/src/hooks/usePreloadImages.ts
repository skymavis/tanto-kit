import { useTheme } from '@emotion/react';
import { useEffect } from 'react';

import * as dataUris from '../assets/dataUris';
import { isValidURL } from '../utils/url';

export function usePreloadImages(imageSources: string[]) {
  useEffect(() => {
    const validSources = imageSources.filter(isValidURL);
    validSources.forEach(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, [imageSources]);
}

export function usePreloadTantoImages() {
  const theme = useTheme();
  const images = [
    dataUris.blueFilledWCLogoUri,
    dataUris.blueFilledWCLogoUri,
    dataUris.roninExtensionCustomLogoUri,
    dataUris.roninExtensionCustomSquareLogoUri,
    dataUris.roninLogoUri,
    dataUris.roninMobileCustomLogoUri,
    dataUris.roninMobileCustomSquareLogoUri,
    dataUris.roninWaypointCustomLogoUri,
    dataUris.roninWaypointCustomSquareLogoUri,
    dataUris.scanWalletsIconUri,
    dataUris.hourglassUri,
  ];
  if (theme.mode === 'light') {
    usePreloadImages([
      dataUris.highlightedWalletItemBackgroundUri.light,
      dataUris.highlightedWalletItemBackgroundUri.lightHover,
    ]);
  }
  if (theme.mode === 'dark') {
    usePreloadImages([
      dataUris.highlightedWalletItemBackgroundUri.dark,
      dataUris.highlightedWalletItemBackgroundUri.darkHover,
    ]);
  }
  usePreloadImages(images);
}
