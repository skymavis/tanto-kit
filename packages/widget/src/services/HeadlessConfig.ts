import { Chain } from 'viem';
import { ronin } from 'viem/chains';

import { MPC_BASE_URL, MPC_BASE_URL_V1, MPC_SOCKET_URL, WAYPOINT_BASE_URL } from '../constants';

export class HeadlessConfig {
  private _chain: Chain;
  private _clientId: string;
  private _waypointBaseUrl: string;
  private _mpcBaseUrlV1: string;
  private _mpcBaseUrl: string;
  private _mpcSocketUrl: string;

  constructor(config: {
    chain: Chain;
    clientId: string;
    waypointBaseUrl: string;
    mpcBaseUrlV1: string;
    mpcBaseUrl: string;
    mpcSocketUrl: string;
  }) {
    this._chain = config.chain;
    this._clientId = config.clientId;
    this._waypointBaseUrl = config.waypointBaseUrl;
    this._mpcBaseUrlV1 = config.mpcBaseUrlV1;
    this._mpcBaseUrl = config.mpcBaseUrl;
    this._mpcSocketUrl = config.mpcSocketUrl;
  }

  get chain() {
    return this._chain;
  }

  get rpcUrl() {
    return this._chain.rpcUrls.default.http[0];
  }

  get waypointBaseUrl() {
    return this._waypointBaseUrl;
  }

  get mpcBaseUrl() {
    return this._mpcBaseUrl;
  }

  get mpcBaseUrlV1() {
    return this._mpcBaseUrlV1;
  }

  get mpcSocketUrl() {
    return this._mpcSocketUrl;
  }

  get clientId() {
    return this._clientId;
  }

  set chain(value: Chain) {
    this._chain = value;
  }

  set waypointBaseUrl(value: string) {
    this._waypointBaseUrl = value;
  }

  set mpcBaseUrlV1(value: string) {
    this._mpcBaseUrlV1 = value;
  }

  set mpcBaseUrl(value: string) {
    this._mpcBaseUrl = value;
  }

  set mpcSocketUrl(value: string) {
    this._mpcSocketUrl = value;
  }

  set clientId(value: string) {
    this._clientId = value;
  }
}

const defaultConfig = {
  chain: ronin,
  waypointBaseUrl: WAYPOINT_BASE_URL,
  mpcBaseUrlV1: MPC_BASE_URL_V1,
  mpcBaseUrl: MPC_BASE_URL,
  mpcSocketUrl: MPC_SOCKET_URL,
  clientId: '',
};

export const headlessConfig = new HeadlessConfig(defaultConfig);
