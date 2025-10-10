import styled from '@emotion/styled';

import { ArrowLeftIcon } from '../../../assets/ArrowLeftIcon';
import { RoninLogo } from '../../../assets/RoninLogo';
import { TransitionedView } from '../../../components/animated-containers/TransitionedView';
import { Box } from '../../../components/box/Box';
import { IconButton } from '../../../components/button/Button';
import { SimpleStepper } from '../../../components/simple-stepper/SimpleStepper';

interface KeylessHeaderProps {
  title?: string | null;
  step?: number | null;
  totalSteps?: number;
  showLogo?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
}

const StyledRoninLogo = styled(RoninLogo)({
  width: 48,
  height: 48,
});

const Title = styled.p({
  fontSize: 20,
  fontWeight: 600,
  textAlign: 'center',
});

export function KeylessHeader({
  title,
  step,
  totalSteps,
  showLogo = false,
  showBackButton = true,
  onBack,
}: KeylessHeaderProps) {
  return (
    <Box fullWidth justify="space-between" pr={44} pl={showBackButton ? 0 : 44}>
      {showBackButton && (
        <IconButton aria-label="Back" intent="secondary" variant="plain" icon={<ArrowLeftIcon />} onClick={onBack} />
      )}

      <TransitionedView viewKey={`${showLogo}-${title}`}>
        <Box vertical align="center" pt={20} gap={20}>
          <SimpleStepper step={step} total={totalSteps} />
          <KeylessTitle title={title} showLogo={showLogo} />
        </Box>
      </TransitionedView>
    </Box>
  );
}

interface KeylessTitleProps {
  title?: string | null;
  showLogo: boolean;
}

function KeylessTitle({ title, showLogo }: KeylessTitleProps) {
  if (!title && !showLogo) return null;

  return (
    <Box gap={16} align="center" vertical>
      {showLogo && <StyledRoninLogo />}
      {title && <Title>{title}</Title>}
    </Box>
  );
}
