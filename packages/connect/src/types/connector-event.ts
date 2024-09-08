import { EventEmitter } from 'events';

import { EIP1193Event, IEIP1193EventArgs } from './eip1193';

export enum WCEvent {
  DISPLAY_URI = 'display_uri',
  SESSION_PING = 'session_ping',
  SESSION_UPDATE = 'session_update',
  SESSION_EVENT = 'session_event',
  SESSION_DELETE = 'session_delete',
}

export interface WCEventArgs {
  [WCEvent.DISPLAY_URI]: string;
  [WCEvent.SESSION_PING]: string;
  [WCEvent.SESSION_UPDATE]: string;
  [WCEvent.SESSION_EVENT]: string;
  [WCEvent.SESSION_DELETE]: string;
}

export type ConnectorEvent = EIP1193Event | WCEvent;

export interface IConnectorEventArgs extends IEIP1193EventArgs, WCEventArgs {}

export class ConnectorEventEmitter extends EventEmitter {
  emit<E extends ConnectorEvent>(event: E, payload?: IConnectorEventArgs[E]): boolean {
    return super.emit(event, payload);
  }

  on<E extends ConnectorEvent>(event: E, listener: (payload: IConnectorEventArgs[E]) => void): this {
    return super.on(event, listener);
  }

  once<E extends ConnectorEvent>(event: E, listener: (payload: IConnectorEventArgs[E]) => void): this {
    return super.once(event, listener);
  }

  off<E extends ConnectorEvent>(event: E, listener: (payload: IConnectorEventArgs[E]) => void): this {
    return super.off(event, listener);
  }
}
