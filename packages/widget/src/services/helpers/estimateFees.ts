import { Client, Hex, numberToHex } from 'viem';
import { estimateFeesPerGas as viemEstimateFeesPerGas, getGasPrice } from 'viem/actions';

import { isEIP1559CompatibleTransaction } from './transactionTypeUtils';
import { SupportedTransactionType } from './types';

const GAS_PRICE_BUFFER_PERCENTAGE = 2; // 2%

const applyBuffer = (value: bigint, percentage: number): bigint => (value * BigInt(100 + percentage)) / 100n;

interface EstimateFeesPerGasReturnType {
  gasPrice: Hex;
  maxFeePerGas: Hex;
  maxPriorityFeePerGas: Hex;
}

interface EstimateFeesPerGasParams {
  chainId: number;
  type: SupportedTransactionType;
  gasPrice?: Hex;
  maxFeePerGas?: Hex;
  maxPriorityFeePerGas?: Hex;
}

const handleEIP1559Transaction = async (
  client: Client,
  params: EstimateFeesPerGasParams,
): Promise<EstimateFeesPerGasReturnType> => {
  const { maxFeePerGas: maxFeePerGasParam, maxPriorityFeePerGas: maxPriorityFeePerGasParam } = params;

  if (maxFeePerGasParam && maxPriorityFeePerGasParam) {
    return {
      gasPrice: '0x0',
      maxFeePerGas: maxFeePerGasParam,
      maxPriorityFeePerGas: maxPriorityFeePerGasParam,
    };
  }

  const { maxFeePerGas, maxPriorityFeePerGas } = await viemEstimateFeesPerGas(client);

  return {
    gasPrice: '0x0',
    maxPriorityFeePerGas: maxPriorityFeePerGasParam || numberToHex(maxPriorityFeePerGas),
    maxFeePerGas: maxFeePerGasParam || numberToHex(maxFeePerGas),
  };
};

const handleLegacyTransaction = async (client: Client, gasPrice?: Hex): Promise<EstimateFeesPerGasReturnType> => {
  if (gasPrice) {
    return {
      gasPrice,
      maxPriorityFeePerGas: '0x0',
      maxFeePerGas: '0x0',
    };
  }

  const baseGasPrice = await getGasPrice(client);
  const bufferedGasPrice = applyBuffer(baseGasPrice, GAS_PRICE_BUFFER_PERCENTAGE);

  return {
    gasPrice: numberToHex(bufferedGasPrice),
    maxPriorityFeePerGas: '0x0',
    maxFeePerGas: '0x0',
  };
};

export async function estimateFeesPerGas(
  client: Client,
  params: EstimateFeesPerGasParams,
): Promise<EstimateFeesPerGasReturnType> {
  const { type, gasPrice } = params;

  try {
    if (isEIP1559CompatibleTransaction(type)) return await handleEIP1559Transaction(client, params);
    return await handleLegacyTransaction(client, gasPrice);
  } catch (error) {
    throw new Error('Failed to estimate gas price. This could be due to network issues or RPC problems.');
  }
}
