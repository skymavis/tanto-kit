import { useEffect } from 'react';

import * as dataUris from '../assets/data-uris';
import { isValidURL } from '../utils';

export const usePreloadImages = (imageSources: string[]) => {
  useEffect(() => {
    const validSources = imageSources.filter(isValidURL);
    validSources.forEach(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, [imageSources]);
};

export const usePreloadTantoImages = () => {
  usePreloadImages([
    dataUris.blueFilledWCLogoUri,
    dataUris.highlightedWalletItemBackgroundUri,
    dataUris.highlightedWalletItemHoverBackgroundUri,
    dataUris.blueFilledWCLogoUri,
    dataUris.roninExtensionCustomLogoUri,
    dataUris.roninExtensionCustomSquareLogoUri,
    dataUris.roninLogoUri,
    dataUris.roninMobileCustomLogoUri,
    dataUris.roninMobileCustomSquareLogoUri,
    dataUris.roninWaypointCustomLogoUri,
    dataUris.roninWaypointCustomSquareLogoUri,
    dataUris.scanWalletsIconUri,
  ]);
};
