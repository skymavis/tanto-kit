import { UAParser } from 'ua-parser-js';

import { isClient } from './common';

export function getUserAgent() {
  if (!isClient()) return undefined;
  return UAParser(navigator.userAgent);
}

export function detectBrowser() {
  const parser = getUserAgent();
  return parser?.browser.name ?? '';
}

export function detectOS() {
  const parser = getUserAgent();
  return parser?.os.name ?? '';
}

export function isIOS() {
  const os = detectOS();
  return os.toLowerCase().includes('ios');
}

export function isAndroid() {
  const os = detectOS();
  return os.toLowerCase().includes('android');
}

export const isMobile = () => isAndroid() || isIOS();

export const isDesktop = () => !isMobile();
