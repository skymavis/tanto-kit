import { name, version } from '../version';

export const checkRoninInstalled = () => {
  if (typeof window !== 'undefined') {
    return window.ronin !== undefined;
  } else {
    return false;
  }
};

export function numberToHex(value: number): string {
  return `0x${value.toString(16)}`;
}

export function getVersionInfo() {
  return `${name}@${version}`;
}
