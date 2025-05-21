import { UAParser } from 'ua-parser-js';
import { v4 } from 'uuid';

import { ANALYTIC_PUBLIC_KEY } from './constants';
import {
  type AnalyticBaseEventData,
  type AnalyticEventData,
  type AnalyticIdentifyEventData,
  type AnalyticOptions,
  type AnalyticStorageConfig,
  type AnalyticStorageData,
  AnalyticEventType,
} from './types/analytic';
import { isClient } from './utils';

class AnalyticStorage {
  private static instance: AnalyticStorage;
  private static readonly MA_CONFIG = '__TANTO_MA_CONFIG' as const;
  private static readonly MA_DATA = '__TANTO_MA_DATA' as const;

  private constructor() {}

  static getInstance(): AnalyticStorage {
    if (!AnalyticStorage.instance) {
      AnalyticStorage.instance = new AnalyticStorage();
    }
    return AnalyticStorage.instance;
  }

  setConfig(data: AnalyticStorageConfig): void {
    try {
      sessionStorage.setItem(AnalyticStorage.MA_CONFIG, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to set config in session storage:', error);
    }
  }

  getConfig(): AnalyticStorageConfig {
    try {
      const data = sessionStorage.getItem(AnalyticStorage.MA_CONFIG);
      if (!data) {
        return this.getDefaultConfig();
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to get config from session storage:', error);
      return this.getDefaultConfig();
    }
  }

  setData(data: AnalyticStorageData): void {
    try {
      sessionStorage.setItem(AnalyticStorage.MA_DATA, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to set data in session storage:', error);
    }
  }

  getData(): AnalyticStorageData {
    try {
      const data = sessionStorage.getItem(AnalyticStorage.MA_DATA);
      if (!data) {
        return {};
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to get data from session storage:', error);
      return {};
    }
  }

  clear(): void {
    try {
      sessionStorage.removeItem(AnalyticStorage.MA_CONFIG);
      sessionStorage.removeItem(AnalyticStorage.MA_DATA);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }

  private getDefaultConfig(): AnalyticStorageConfig {
    return {
      sessionId: v4(),
    };
  }
}

class PlatformDataCollector {
  private static instance: PlatformDataCollector;
  private userAgent: UAParser | undefined;

  private constructor() {
    if (!isClient()) {
      return;
    }
    this.userAgent = new UAParser(window.navigator.userAgent);
  }

  static getInstance(): PlatformDataCollector {
    if (!PlatformDataCollector.instance) {
      PlatformDataCollector.instance = new PlatformDataCollector();
    }
    return PlatformDataCollector.instance;
  }

  getPlatformData(): AnalyticIdentifyEventData {
    return {
      build_version:
        [this.userAgent?.getBrowser().name, this.userAgent?.getBrowser().version].filter(Boolean).join(' - ') ||
        'Unknown',
      device_name:
        [this.userAgent?.getDevice().vendor, this.userAgent?.getDevice().model].filter(Boolean).join(' - ') ||
        'Unknown',
      platform_name: this.userAgent?.getOS().name || 'Unknown',
      platform_version: this.userAgent?.getOS().version || 'Unknown',
    };
  }
}

class Analytic {
  private static readonly INTERNAL_EVENTS = ['heartbeat', 'identify'];
  private static readonly BATCH_SIZE = 20;
  private static readonly HEARTBEAT_INTERVAL = 2000;
  private static readonly DEVICE_FINGERPRINT_KEY = '__TANTO_MA_DFP';
  private static readonly FIRST_PARTY_DOMAINS = ['skymavis.com', 'skymavis.one', 'roninchain.com', 'axieinfinity.com'];

  private intervalId: NodeJS.Timeout | null = null;
  private apiKey!: string;
  private events!: Array<AnalyticEventData>;
  private storage!: AnalyticStorage;
  private platformDataCollector!: PlatformDataCollector;

  constructor(apiKey: string) {
    if (!isClient()) {
      return;
    }

    this.apiKey = apiKey;
    this.events = [];
    this.storage = AnalyticStorage.getInstance();
    this.platformDataCollector = PlatformDataCollector.getInstance();
    if (!localStorage.getItem(Analytic.DEVICE_FINGERPRINT_KEY)) {
      localStorage.setItem(Analytic.DEVICE_FINGERPRINT_KEY, v4());
    }
  }

  private isFirstPartyDomain(): boolean {
    if (!isClient()) {
      return false;
    }

    if (Analytic.FIRST_PARTY_DOMAINS.includes(window.location.hostname)) {
      return true;
    }

    return Analytic.FIRST_PARTY_DOMAINS.some(domain => window.location.hostname.endsWith(`.${domain}`));
  }

  updateSession(options?: AnalyticOptions): void {
    if (this.isFirstPartyDomain()) {
      return;
    }

    const { sessionId: currentSessionId, userAddress: currentUserAddress } = this.storage.getConfig();
    const data = this.storage.getData();
    const shouldUseCurrentSessionId = !options?.force && !!currentSessionId;
    const sessionId = shouldUseCurrentSessionId ? currentSessionId : options?.sessionId || v4();

    this.storage.setConfig({
      userAddress: currentUserAddress || options?.userAddress,
      sessionTimeout: options?.sessionTimeout,
      sessionId,
    });

    if (options?.resetLastEventRef) {
      this.storage.setData({
        ...data,
        lastEvent: undefined,
      });
    }

    if (!shouldUseCurrentSessionId) {
      this.handleNewSession(options);
    }

    this.startHeartbeat();
  }

  private handleNewSession(options?: AnalyticOptions): void {
    try {
      if (!this.validate()) {
        return;
      }
      this.resetSession();

      this.trackEvents(
        [
          {
            type: AnalyticEventType.IDENTIFY,
            data: {
              event: 'identify',
              ...this.platformDataCollector.getPlatformData(),
              user_properties: {
                ...(options?.commonProperties ?? {}),
                build_version: __sdkVersion,
                app_origin: isClient() ? window.location.origin : undefined,
              },
              ...this.storage.getData(),
              device_id: options?.deviceId || localStorage.getItem(Analytic.DEVICE_FINGERPRINT_KEY) || undefined,
            },
          },
        ],
        { force: true },
      );

      if (options?.sessionTimeout) {
        this.storage.setData({ sessionCreatedAt: Date.now() });
      }
    } catch (error) {
      console.error('Failed to handle new session:', error);
    }
  }

  revoke(): void {
    this.storage.clear();
    this.stopHeartbeat();
  }

  startHeartbeat(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.sendEvent('heartbeat');
      }, Analytic.HEARTBEAT_INTERVAL);
    }
  }

  stopHeartbeat(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  sendEvent(eventName: string, data: Record<string, unknown> = {}): void {
    try {
      if (!this.validate()) return;

      this.trackEvents(
        [
          {
            type: AnalyticEventType.TRACK,
            data: {
              action_properties: {
                ...data,
                build_version: __sdkVersion,
                app_origin: isClient() ? window.location.origin : undefined,
              },
              action: eventName,
              event: eventName,
            },
          },
        ],
        { force: eventName !== 'heartbeat' },
      );
    } catch (error) {
      console.error('Failed to send event:', error);
    }
  }

  sendScreen(screen: string, data: Record<string, unknown> = {}): void {
    try {
      if (!this.validate()) return;

      this.trackEvents([
        {
          type: AnalyticEventType.SCREEN,
          data: {
            screen,
            screen_properties: {
              ...data,
              build_version: __sdkVersion,
              app_origin: isClient() ? window.location.origin : undefined,
            },
          },
        },
      ]);
    } catch (error) {
      console.error('Failed to send screen:', error);
    }
  }

  private getBaseData(): AnalyticBaseEventData {
    const data = this.storage.getData();
    const config = this.storage.getConfig();
    return {
      uuid: v4(),
      ref: data.lastEvent,
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
      session_id: config.sessionId,
      user_id: config.userAddress,
    };
  }

  private async trackEvents(eventsData: Array<AnalyticEventData>, options?: { force?: boolean }): Promise<void> {
    try {
      const { force = true } = options || {};
      const data = this.storage.getData();

      const events = eventsData.map(event => ({
        type: event.type,
        data: {
          ...this.getBaseData(),
          ...this.platformDataCollector.getPlatformData(),
          ...event.data,
          device_id: localStorage.getItem(Analytic.DEVICE_FINGERPRINT_KEY),
        },
      }));

      this.events.push(...events);

      if (force || this.events.length >= Analytic.BATCH_SIZE) {
        await this.send(this.events);
        this.events.length = 0;
      }

      const lastEvent = eventsData[eventsData.length - 1]?.data.event;
      if (lastEvent && !Analytic.INTERNAL_EVENTS.includes(lastEvent)) {
        this.storage.setData({ ...data, lastEvent });
      }
    } catch (error) {
      console.error('Failed to track events:', error);
    }
  }

  private async send(events: Array<AnalyticEventData>): Promise<Response> {
    return fetch('https://x.skymavis.com/track', {
      method: 'POST',
      headers: [
        ['Authorization', `Basic ${btoa(`${this.apiKey}:`)}`],
        ['Content-Type', 'application/json'],
      ],
      body: JSON.stringify({ events }),
    });
  }

  private resetSession(): void {
    const config = this.storage.getConfig();
    const data = this.storage.getData();
    const { sessionTimeout } = config;
    const { sessionCreatedAt = 0 } = data;

    if (sessionTimeout) {
      const sessionExpiredAt = sessionCreatedAt + sessionTimeout * 1000;
      const now = Date.now();

      if (now >= sessionExpiredAt) {
        this.storage.setData({
          ...data,
          sessionCreatedAt: now,
        });
        this.storage.setConfig({
          ...config,
          sessionId: v4(),
        });
      }
    } else if (sessionCreatedAt) {
      this.storage.setData({
        ...data,
        sessionCreatedAt: undefined,
      });
    }
  }

  private validate(): boolean {
    return Boolean(this.apiKey);
  }
}

export const analytic = new Analytic(ANALYTIC_PUBLIC_KEY);
