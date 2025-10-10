export type Resolver<T> = (value?: T | PromiseLike<T>) => void;
export type Rejector = (reason?: unknown) => void;

export interface DeferredConfig {
  timeout?: number;
  timeoutReason?: string | Error;
}

export class Deferred<T = void> {
  readonly promise: Promise<T>;
  private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  private resolveFn!: Resolver<T>;
  private rejectFn!: Rejector;
  private timeoutId?: NodeJS.Timeout;

  constructor(config: DeferredConfig = {}) {
    const { timeout, timeoutReason = new Error(`Promise timed out after ${timeout}ms`) } = config;

    this.promise = new Promise<T>((resolve, reject) => {
      this.resolveFn = resolve as Resolver<T>;
      this.rejectFn = reject;

      if (timeout && timeout > 0) {
        this.timeoutId = setTimeout(() => {
          this.reject(timeoutReason);
        }, timeout);
      }
    });
  }

  resolve(value?: T | PromiseLike<T>): void {
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.clearTimeout();
      this.resolveFn(value);
    }
  }

  reject(reason?: unknown): void {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.clearTimeout();
      this.rejectFn(reason);
    }
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
