export function truncate(
  value?: string,
  options?: {
    prefixChar?: number;
    suffixChar?: number;
    bridge?: string;
  },
) {
  const { prefixChar = 8, suffixChar = 6, bridge = '•••' } = options ?? {};
  if (!value) return '';
  if (value.length <= prefixChar + suffixChar + bridge.length) return value;
  return `${value.slice(0, prefixChar)}${bridge}${value.slice(-suffixChar)}`;
}

export function getReverseNode(address: string): string {
  const node = address.startsWith('0x') ? address.substring(2) : address;
  return `${node.toLowerCase()}.addr.reverse`;
}

export function svgToBase64(svgText: string) {
  const encoded = encodeURIComponent(svgText).replace(/'/g, '%27').replace(/"/g, '%22');
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}
