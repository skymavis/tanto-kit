import type { Address } from 'viem';
import { createSiweMessage } from 'viem/siwe';

import { isClient } from './common';

const SIWE_STATEMENT =
  'I accept the Terms of Use (https://axieinfinity.com/terms-of-use) and the Privacy Policy (https://axieinfinity.com/privacy-policy)';

export function generateSiweMessage({ address, chainId, nonce }: { address: Address; chainId: number; nonce: string }) {
  if (!isClient()) return '';
  const ethMessage = createSiweMessage({
    version: '1',
    domain: window.location.host,
    uri: window.location.origin,
    address,
    chainId,
    nonce,
    statement: SIWE_STATEMENT,
  });
  const roninMessage = ethMessage.replace('Ethereum', 'Ronin');
  return roninMessage;
}
