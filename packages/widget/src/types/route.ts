export enum Route {
  WALLETS = 'WALLETS',
  CONNECT_INJECTOR = 'CONNECT_INJECTOR',
  CONNECT_WC = 'CONNECT_WC',
  PROFILE = 'PROFILE',
}

export const publicRotues = [Route.WALLETS, Route.CONNECT_INJECTOR, Route.CONNECT_WC];
export const privateRoutes = [Route.PROFILE];
