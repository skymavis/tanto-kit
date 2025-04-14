import { detect } from 'detect-browser';

export const detectBrowser = () => {
  const browser = detect();
  return browser?.name ?? '';
};

export const detectOS = () => {
  const browser = detect();
  return browser?.os ?? '';
};

export const isIOS = () => {
  const os = detectOS();
  return os.toLowerCase().includes('ios');
};

export const isAndroid = () => {
  const os = detectOS();
  return os.toLowerCase().includes('android');
};

export const isMobile = () => {
  return isAndroid() || isIOS();
};
