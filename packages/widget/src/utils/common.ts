export const notEmpty = <T>(value: T): value is NonNullable<T> => typeof value !== 'undefined' && value !== null;

export const isClient = () => typeof window !== 'undefined';

export const getVersionInfo = () => `${__sdkName}@${__sdkVersion}`;

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const hasValue = <T>(value: T): value is NonNullable<T> => typeof value !== 'undefined' && value !== null;
