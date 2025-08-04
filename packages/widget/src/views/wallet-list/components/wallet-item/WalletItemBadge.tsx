import { Badge } from '../../../../components/badge/Badge';

interface WalletItemBadgeProps {
  isConnected: boolean;
  isDetected: boolean;
  highlightText?: string;
}

export function WalletItemBadge({ isConnected, isDetected, highlightText }: WalletItemBadgeProps) {
  if (isConnected) return <Badge key="connected">Connected</Badge>;
  if (!isConnected && highlightText) {
    return (
      <Badge key="highlight" intent="highlight">
        {highlightText}
      </Badge>
    );
  }
  if (isDetected) return <Badge key="detected">Detected</Badge>;
  return null;
}
