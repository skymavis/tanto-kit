import { getAddress } from 'viem';

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
  return `${domain} wants you to sign in with your Ethereum account:
${getAddress(address)}

By signing, you confirm ownership of this wallet, agree to the Terms of Use (https://wallet.roninchain.com/terms) & Privacy Policy (https://wallet.roninchain.com/privacy), and proceed with login. This action does not initiate any transaction or incur fees.

URI: ${uri}
Version: ${version}
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt}
Expiration Time: ${expirationTime}
Not Before: ${notBefore}`;
}
