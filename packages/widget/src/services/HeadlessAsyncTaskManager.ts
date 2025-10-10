import { Address, Hex, TypedDataDefinition } from 'viem';

import { AsyncTaskManager } from '../utils/AsyncTaskManager';
import { TransactionParams } from './helpers/types';

export enum HeadlessOperationType {
  PersonalSign = 'wallet:personal-sign',
  SignTypedDataV4 = 'wallet:sign-typed-data-v4',
  SendTransaction = 'wallet:send-transaction',
}

export interface HeadlessOperationParamsMap {
  [HeadlessOperationType.PersonalSign]: [data: Hex, address: Address];
  [HeadlessOperationType.SignTypedDataV4]: [address: Address, data: TypedDataDefinition | string];
  [HeadlessOperationType.SendTransaction]: [transaction: TransactionParams];
}

// Just for confirmation, no result is needed
export interface HeadlessOperationResultMap {
  [HeadlessOperationType.PersonalSign]: void;
  [HeadlessOperationType.SignTypedDataV4]: void;
  [HeadlessOperationType.SendTransaction]: void;
}

export class HeadlessAsyncTaskManager extends AsyncTaskManager<
  HeadlessOperationType,
  HeadlessOperationParamsMap,
  HeadlessOperationResultMap
> {}

export type HeadlessTask = {
  [T in HeadlessOperationType]: {
    id: string;
    operationType: T;
    params: HeadlessOperationParamsMap[T];
  };
}[HeadlessOperationType];
