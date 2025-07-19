import { ArrowLeftIcon } from '../../../assets/ArrowLeftIcon';
import { RoninLogo } from '../../../assets/RoninLogo';
import { TransitionedView } from '../../../components/animated-containers/TransitionedView';
import { Box } from '../../../components/box/Box';
import { IconButton } from '../../../components/button/Button';

export interface KeylessHeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
  showLogo?: boolean;
}

export function KeylessHeader({ showBackButton = true, onBack, title, showLogo = false }: KeylessHeaderProps) {
  return (
    <Box fullWidth justify="space-between" pr={44}>
      {showBackButton && (
        <IconButton aria-label="Back" intent="secondary" variant="plain" icon={<ArrowLeftIcon />} onClick={onBack} />
      )}
      <TransitionedView viewKey={showLogo}>
        {showLogo && (
          <Box fullWidth mb={32}>
            <Box fullWidth vertical gap={16} align="center">
              <RoninLogo
                css={{
                  width: 48,
                  height: 48,
                }}
              />
              {title && (
                <p
                  css={{
                    fontSize: 20,
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  {title}
                </p>
              )}
            </Box>
          </Box>
        )}
      </TransitionedView>
    </Box>
  );
}
