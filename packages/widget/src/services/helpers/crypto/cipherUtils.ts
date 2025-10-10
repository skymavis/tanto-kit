import { bytesToString } from 'viem';

import { base64ToBytes } from '../../../utils/convertor';

const TAG_LENGTH_BYTE = 16; // 128 bits
const IV_LENGTH_BYTE = 12;

/**
 * Parse packed ciphertext into iv, authTag, cipherText
 */
export const parsePackedCipher = (
  packedContent: string,
): { iv: Uint8Array; authTag: Uint8Array; cipherText: Uint8Array } => {
  const l2InBytes = base64ToBytes(packedContent);
  const l1InBase64 = bytesToString(l2InBytes);
  const content = base64ToBytes(l1InBase64);

  const ivSize = content[0] ?? IV_LENGTH_BYTE; // 1st byte: iv size
  const authTagSize = content[1] ?? TAG_LENGTH_BYTE; // 2nd byte: authTag size

  const iv = content.slice(2, 2 + ivSize);
  const cipherText = content.slice(2 + ivSize, content.length - authTagSize);
  const authTag = content.slice(content.length - authTagSize);

  return { iv, authTag, cipherText };
};

/**
 * Extract first segment (v1 content) from encryptedData
 */
export const extractV1Content = (encryptedData: string) => {
  const parts = encryptedData.split('.');
  const v1Content = parts[0];
  if (!v1Content) throw new Error('Encrypted content is empty.');
  return v1Content;
};
