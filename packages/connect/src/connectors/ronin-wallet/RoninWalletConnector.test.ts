import { DEFAULT_CONNECTORS_CONFIG } from '../../common/connectors';
import { checkRoninInstalled } from '../../utils';
import { requestRoninWalletConnector } from '../index';
import { RoninWalletConnector } from './RoninWalletConnector';

jest.mock('../../utils', () => ({
  checkRoninInstalled: jest.fn(), // Properly mock checkRoninInstalled
}));

describe('RoninWalletConnector', () => {
  let connector: RoninWalletConnector;

  beforeEach(async () => {
    (checkRoninInstalled as jest.Mock).mockReturnValue(true);
    connector = await requestRoninWalletConnector();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('setup', () => {
    expect(connector).toBeInstanceOf(RoninWalletConnector);
  });

  test('should initialize with default config', () => {
    expect(connector.name).toEqual(DEFAULT_CONNECTORS_CONFIG.RONIN_WALLET.name);
  });
});
