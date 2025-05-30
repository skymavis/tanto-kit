export interface AnalyticBaseEventData {
  uuid?: string;
  ref?: string | null;
  timestamp?: string;
  session_id?: string;
  offset?: number;
  user_id?: string;
  event?: string;
}

interface AnalyticEventDictionary<DynamicType> {
  [id: string]: DynamicType;
}

export type AnalyticTrackEventData = {
  action_properties?: AnalyticEventDictionary<unknown>;
  action?: string;
} & AnalyticBaseEventData;

export type AnalyticIdentifyEventData = {
  build_version?: string;
  device_name?: string;
  device_id?: string;
  platform_name?: string;
  platform_version?: string;
  internet_type?: string;
  user_properties?: AnalyticEventDictionary<unknown>;
} & AnalyticBaseEventData;

export type AnalyticScreenEventData = {
  screen_properties?: AnalyticEventDictionary<unknown>;
  screen?: string;
} & AnalyticBaseEventData;

export enum AnalyticEventType {
  IDENTIFY = 'identify',
  TRACK = 'track',
  SCREEN = 'screen',
}

export interface AnalyticEventData {
  type: AnalyticEventType;
  data: AnalyticIdentifyEventData | AnalyticTrackEventData | AnalyticScreenEventData;
}

export interface AnalyticOptions {
  userAddress?: string;
  sessionTimeout?: number; // second
  sessionId?: string;
  force?: boolean;
  deviceId?: string;
  commonProperties?: Record<string, unknown>;
  resetLastEventRef?: boolean;
}

export interface AnalyticStorageConfig {
  userAddress?: string;
  /**
   * as seconds
   */
  sessionTimeout?: number;
  sessionId: string;
}

export interface AnalyticStorageData {
  lastEvent?: string;
  sessionCreatedAt?: number;
}
