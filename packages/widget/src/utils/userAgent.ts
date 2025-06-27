import { UAParser } from 'ua-parser-js';

import { isClient } from './common';

export const getUserAgent = () => {
  if (!isClient()) return undefined;
  return UAParser(navigator.userAgent);
};

export const detectBrowser = () => {
  const parser = getUserAgent();
  return parser?.browser.name ?? '';
};

export const detectOS = () => {
  const parser = getUserAgent();
  return parser?.os.name ?? '';
};

export const isIOS = () => {
  const os = detectOS();
  return os.toLowerCase().includes('ios');
};

export const isAndroid = () => {
  const os = detectOS();
  return os.toLowerCase().includes('android');
};

export const isMobile = () => isAndroid() || isIOS();

export const isDesktop = () => !isMobile();
