import { encryptAESKeyWithRSA } from './rsa';

/**
 * AES-GCM encryption with RSA-wrapped AES key
 */
export const encryptWithAES = async (
  content: string,
  pemPublicKey: string,
): Promise<{ ciphertextB64: string; nonceB64: string; encryptedKeyB64: string }> => {
  // 1. Generate AES key and wrap it with RSA
  const { encryptedKey, aesKey } = await encryptAESKeyWithRSA(pemPublicKey);

  // 2. Encrypt content with AES
  const contentBytes = new TextEncoder().encode(content);
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    aesKey,
    {
      name: 'AES-GCM',
    },
    false,
    ['encrypt'],
  );
  const nonce = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: nonce,
    },
    cryptoKey,
    contentBytes,
  );

  // 3. Encode all outputs to base64
  const ciphertextB64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  const nonceB64 = btoa(String.fromCharCode(...nonce));
  const encryptedKeyB64 = btoa(String.fromCharCode(...new Uint8Array(encryptedKey)));

  return { ciphertextB64, nonceB64, encryptedKeyB64 };
};

/**
 * AES-GCM decryption
 */
export const decryptWithAES = async (ciphertextB64: string, nonceB64: string, aesKey: Uint8Array): Promise<string> => {
  const nonce = Uint8Array.from(atob(nonceB64), c => c.charCodeAt(0));
  const encryptedContent = Uint8Array.from(atob(ciphertextB64), c => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    aesKey,
    {
      name: 'AES-GCM',
    },
    false,
    ['decrypt'],
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: nonce,
    },
    cryptoKey,
    encryptedContent,
  );

  return new TextDecoder().decode(decrypted);
};
