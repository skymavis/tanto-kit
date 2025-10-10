import { SupportedTransaction, SupportedTransactionType, TransactionType } from './types';

export const isEIP1559CompatibleTransaction = (type: TransactionType | undefined): boolean =>
  type === SupportedTransaction.EIP1559 || type === SupportedTransaction.RoninGasSponsor;

export const isRoninGasSponsorTransaction = (type: TransactionType | undefined): boolean =>
  type === SupportedTransaction.RoninGasSponsor;

export const isRoninLegacyTransaction = (type: TransactionType | undefined): boolean =>
  type === SupportedTransaction.Legacy;

export const isSupportedTransaction = (type: TransactionType | undefined): boolean =>
  type !== undefined && Object.values(SupportedTransaction).includes(type as SupportedTransactionType);
