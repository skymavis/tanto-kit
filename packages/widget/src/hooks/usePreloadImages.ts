import { useEffect } from 'react';

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
