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
