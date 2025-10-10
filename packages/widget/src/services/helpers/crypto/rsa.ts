/**
 * Encrypt AES key using RSA-OAEP public key
 */
export const encryptAESKeyWithRSA = async (
  pemPublicKey: string,
  key?: Uint8Array,
): Promise<{ encryptedKey: ArrayBuffer; aesKey: Uint8Array }> => {
  const aesKey = key ?? crypto.getRandomValues(new Uint8Array(32));

  const pemHeader = '-----BEGIN PUBLIC KEY-----';
  const pemFooter = '-----END PUBLIC KEY-----';
  const pemContents = pemPublicKey.replace(pemHeader, '').replace(pemFooter, '').replace(/\s/g, '');
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

  const rsaPublicKey = await crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    false,
    ['encrypt'],
  );

  const encryptedKey = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    rsaPublicKey,
    aesKey,
  );

  return { encryptedKey, aesKey };
};
