import { jwtDecode } from 'jwt-decode';
import { stringToBytes } from 'viem';

const DEFAULT_ISS = 'https://athena.skymavis.com/';

/**
 * Derive AES key using PBKDF2
 */
const pbkdf2DeriveKey = async (password: Uint8Array, salt: Uint8Array) => {
  const baseKey = await crypto.subtle.importKey('raw', password, { name: 'PBKDF2' }, false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 4096,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
};

/**
 * Derive recovery key from waypoint token + recoveryPassword
 */
export const deriveRecoveryKey = async (waypointToken: string, recoveryPassword: string) => {
  const { sub } = jwtDecode(waypointToken);
  const salt = stringToBytes(`${DEFAULT_ISS}:${sub}`);
  const password = stringToBytes(`${DEFAULT_ISS}:${sub}:${recoveryPassword}`);
  return pbkdf2DeriveKey(password, salt);
};
