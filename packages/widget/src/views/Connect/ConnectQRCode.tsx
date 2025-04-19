import { Box } from '../../components/box/Box';
import { WCQRCode } from '../../components/qr-code/WCQRCode';
import { useTanto } from '../../hooks/useTanto';
import { useWalletConnectUri } from '../../hooks/useWalletConnectUri';

export function ConnectQRCode() {
  const { connector } = useTanto();
  const { uri: walletConnectUri } = useWalletConnectUri({ connector });

  if (!connector) return null;

  return (
    <Box vertical align="center" justify="center" gap={32} pt={20}>
      <WCQRCode value={walletConnectUri} />
    </Box>
  );
}
