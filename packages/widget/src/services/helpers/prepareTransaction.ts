import { type Address, Client, createClient, Hex, hexToBigInt, http, isAddress, numberToHex } from 'viem';
import { estimateGas, getTransactionCount } from 'viem/actions';

import { estimateFeesPerGas } from './estimateFees';
import { isSupportedTransaction } from './transactionTypeUtils';
import {
  ChainParams,
  PAYER_INFO,
  SupportedTransaction,
  SupportedTransactionType,
  TransactionInServerFormat,
  TransactionParams,
  TransactionType,
} from './types';

export const DEFAULT_VALUE = '0x0';
export const DEFAULT_DATA = '0x';
export const GAS_LIMIT_BUFFER_MULTIPLIER = 2n;
export const EXPIRED_TIME_PLACEHOLDER = '0x5208';

export function validateTransactionType(type: TransactionType | undefined): SupportedTransactionType {
  if (!isSupportedTransaction(type))
    throw new Error(
      `Transaction type "${type}" is not supported. Supported types: legacy (0x0), EIP1559 (0x2), sponsored (0x64).`,
    );
  return type as SupportedTransactionType;
}

export function validateToAddress(to: Address | null): Address {
  if (!to || !isAddress(to)) throw new Error(`Invalid 'to' address: ${to}.`);
  return to;
}

export function validateFromAddress(from: Address | undefined): Address {
  if (!from || !isAddress(from)) throw new Error(`Invalid 'from' address: ${from}.`);
  return from;
}

export async function estimateGasLimit(
  client: Client,
  params: {
    to: Address;
    from: Address;
    value: Hex;
    data: Hex;
    gas?: Hex;
  },
): Promise<Hex> {
  try {
    const { to, from, value, data, gas } = params;
    if (gas) return gas;
    const baseGasLimit = await estimateGas(client, {
      to,
      account: from,
      value: hexToBigInt(value),
      data,
    });
    return numberToHex(baseGasLimit * GAS_LIMIT_BUFFER_MULTIPLIER);
  } catch (error) {
    throw new Error(
      'Failed to estimate gas limit. This could be due to network issues or invalid transaction parameters.',
    );
  }
}

export async function getNonceFromNetwork(client: Client, params: { from: Address; nonce?: Hex }): Promise<Hex> {
  try {
    const { from, nonce } = params;
    if (nonce) return nonce;
    const count = await getTransactionCount(client, {
      address: from,
      blockTag: 'pending',
    });
    return numberToHex(count);
  } catch (error) {
    throw new Error('Failed to get transaction nonce. This could be due to network issues or RPC problems.');
  }
}

export interface FormatTransactionParams {
  transaction: TransactionParams;
  chain: ChainParams;
  currentAddress?: Address;
}

export const toTransactionInServerFormat = async (
  params: FormatTransactionParams,
): Promise<TransactionInServerFormat> => {
  const {
    chain: { chainId, rpcUrl },
    currentAddress,
    transaction,
  } = params;

  const {
    value = DEFAULT_VALUE,
    data = DEFAULT_DATA,
    type: rawType = SupportedTransaction.EIP1559,
    from: rawFrom = currentAddress,
    to: rawTo,
    gasPrice: rawGasPrice,
    nonce: rawNonce,
    input,
    gas,
  } = transaction;

  const type = validateTransactionType(rawType);
  const to = validateToAddress(rawTo);
  const from = validateFromAddress(rawFrom);
  const client = createClient({ transport: http(rpcUrl) });
  const transactionData = input ?? data;

  try {
    const [nonce, feesPerGas, gasLimit] = await Promise.all([
      getNonceFromNetwork(client, { from, nonce: rawNonce }),
      estimateFeesPerGas(client, { type, chainId, gasPrice: rawGasPrice }),
      estimateGasLimit(client, { to, from, value, gas, data: transactionData }),
    ]);

    const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = feesPerGas;

    const formattedTransaction: TransactionInServerFormat = {
      type,
      from,
      to,
      value,
      nonce,
      gasPrice,
      input: transactionData,
      chainId: numberToHex(chainId),
      gas: gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
      r: DEFAULT_VALUE,
      v: DEFAULT_VALUE,
      s: DEFAULT_VALUE,
      payerS: PAYER_INFO.s,
      payerR: PAYER_INFO.r,
      payerV: PAYER_INFO.v,
      expiredTime: EXPIRED_TIME_PLACEHOLDER,
    };

    return formattedTransaction;
  } catch (error) {
    throw new Error('Failed to prepare transaction for server format.');
  }
};
