export interface SigningMessageType {
  address: string;
  version?: number;
  chainId: number;
  nonce: string;
  issuedAt: string;
  expirationTime: string;
  notBefore: string;
  domain?: string;
  uri?: string;
}

export function generateSiweMessage({
  address,
  nonce,
  issuedAt,
  expirationTime,
  notBefore,
  chainId,
  version = 1,
  domain = window.location.host,
  uri = window.location.origin,
}: SigningMessageType) {
  return `${domain} wants you to sign in with your Ronin account:
${address.replace('0x', 'ronin:').toLowerCase()}

I accept the Terms of Use (https://axieinfinity.com/terms-of-use) and the Privacy Policy (https://axieinfinity.com/privacy-policy)

URI: ${uri}
Version: ${version}
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt}
Expiration Time: ${expirationTime}
Not Before: ${notBefore}`;
}
