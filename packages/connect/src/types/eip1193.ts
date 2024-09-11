export enum EIP1193Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  ACCOUNTS_CHANGED = 'accountsChanged',
  CHAIN_CHANGED = 'chainChanged',
  MESSAGE = 'message',
}

export interface IProviderRequestArgs {
  method: any;
  params?: any;
}

export interface IProviderConnectArgs {
  chainId: string;
}

export interface IProviderMessageArgs {
  type: string;
  data: unknown;
}

export interface IProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface IEIP1193EventArgs {
  [EIP1193Event.CONNECT]: IProviderConnectArgs;
  [EIP1193Event.DISCONNECT]: IProviderRpcError | undefined;
  [EIP1193Event.CHAIN_CHANGED]: string;
  [EIP1193Event.ACCOUNTS_CHANGED]: string[];
  [EIP1193Event.MESSAGE]: IProviderMessageArgs;
}

export interface IEIP1193EventEmitter {
  on: <E extends EIP1193Event>(event: E, listener: (args: IEIP1193EventArgs[E]) => void) => void;
  once: <E extends EIP1193Event>(event: E, listener: (args: IEIP1193EventArgs[E]) => void) => void;
  off: <E extends EIP1193Event>(event: E, listener: (args: IEIP1193EventArgs[E]) => void) => void;
  removeListener: <E extends EIP1193Event>(event: E, listener: (args: IEIP1193EventArgs[E]) => void) => void;
  emit: <E extends EIP1193Event>(event: E, payload: IEIP1193EventArgs[E]) => boolean;
}

export interface IEIP1193Provider extends IEIP1193EventEmitter {
  request: <T = unknown>(args: IProviderRequestArgs) => Promise<T>;

  isRonin?: boolean;
  isMetaMask?: boolean;
}
