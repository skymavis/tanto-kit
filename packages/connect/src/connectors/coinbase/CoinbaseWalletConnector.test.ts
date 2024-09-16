import { DEFAULT_CONNECTORS_CONFIG } from '../../common/connectors';
import { checkCoinbaseInstalled } from '../../utils';
import { CoinbaseWalletConnector } from './CoinbaseWalletConnector';

jest.mock('../../utils', () => ({
  checkCoinbaseInstalled: jest.fn(), // Properly mock checkCoinbaseInstalled
}));

describe('CoinbaseWalletConnector', () => {
  let connector: CoinbaseWalletConnector;

  beforeEach(() => {
    (checkCoinbaseInstalled as jest.Mock).mockReturnValue(true);
    connector = new CoinbaseWalletConnector();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('setup', () => {
    expect(connector).toBeInstanceOf(CoinbaseWalletConnector);
  });

  test('should initialize with default config', () => {
    expect(connector.name).toEqual(DEFAULT_CONNECTORS_CONFIG.COINBASE_WALLET.name);
  });
});
