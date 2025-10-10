import { type AccessList, type Address, type Hex } from 'viem';

export const SupportedTransaction = {
  Legacy: '0x0',
  EIP1559: '0x2',
  RoninGasSponsor: '0x64',
} as const;

export const UnsupportedTransaction = {
  EIP2930: '0x1',
  EIP4844: '0x3',
  EIP7702: '0x4',
} as const;

export type SupportedTransactionType = typeof SupportedTransaction[keyof typeof SupportedTransaction];
export type UnsupportedTransactionType = typeof UnsupportedTransaction[keyof typeof UnsupportedTransaction];
export type TransactionType = SupportedTransactionType | UnsupportedTransactionType;

export const PAYER_INFO = {
  s: '0x3caeb99cc6659c5ca4c66b91b1686a86fe0493e1122bdd09f2babdf72e54041a',
  r: '0xdbdbd0989f595c0921acaf9c80342bbeff3b8ea6d2a9ad3167e63010715de3fd',
  v: '0x1',
} as const;

export interface TransactionParams {
  // * "0x64" for ronin gas sponsor
  type?: TransactionType;

  // * auto fill
  nonce?: Hex;
  // * null when creating new contract
  to: Address | null;
  // * auto fill with current address
  from?: Address;

  value?: Hex;
  input?: Hex;
  data?: Hex;

  // * auto fill
  gas?: Hex;
  // * auto fill
  gasPrice?: Hex;

  // * ronin do NOT support "0x1"
  accessList?: AccessList;

  // * EIP-1559; Type 2
  maxPriorityFeePerGas?: Hex;
  maxFeePerGas?: Hex;
  maxFeePerBlobGas?: Hex;
  blobVersionedHashes?: Array<Hex>;
  blobs?: Array<Hex>;
}
export interface ChainParams {
  chainId: number;
  rpcUrl: string;
}

export interface SendTransactionParams {
  waypointToken: string;
  clientShard: string;

  chain: ChainParams;
  transaction: TransactionParams;

  wasmUrl: string;
  wsUrl: string;
}

export interface SendTransactionResult {
  txHash: Hex;
  signature: Hex;
}

export interface TransactionInServerFormat {
  from: Address;
  to: Address;
  value: Hex;
  input: Hex;
  nonce: Hex;
  gas: Hex;
  gasPrice: Hex;
  maxPriorityFeePerGas: Hex;
  maxFeePerGas: Hex;

  type: SupportedTransactionType;
  chainId: Hex;
  r: Hex;
  v: Hex;
  s: Hex;
  payerS: Hex;
  payerR: Hex;
  payerV: Hex;
  expiredTime: Hex;
}
