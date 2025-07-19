export enum Route {
  KEYLESS = 'KEYLESS',
  WALLETS = 'WALLETS',
  CONNECT_INJECTOR = 'CONNECT_INJECTOR',
  CONNECT_WC = 'CONNECT_WC',
  PROFILE = 'PROFILE',
}

export const publicRoutes = [Route.WALLETS];
export const authenticatedRoutes = [Route.PROFILE];
export const internalRoutes = [Route.CONNECT_INJECTOR, Route.CONNECT_WC];
