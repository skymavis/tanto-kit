import { type Hex, bytesToHex, hexToBytes } from 'viem';

const stringToBytes = (value: string) => {
  const charCode = Array.from(value, m => m.codePointAt(0));
  return Uint8Array.from(charCode);
};

const bytesToString = (bytes: Uint8Array) => {
  return Array.from(bytes, b => String.fromCodePoint(b)).join('');
};

export const bytesToBase64 = (bytes: Uint8Array) => btoa(bytesToString(bytes));

export const base64ToBytes = (base64: string) => stringToBytes(atob(base64));

export const base64ToHex = (base64: string) => bytesToHex(base64ToBytes(base64));

export const hexToBase64 = (hex: Hex) => bytesToBase64(hexToBytes(hex));

export const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
