import styled from '@emotion/styled';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { Hourglass } from '../../../assets/Hourglass';
import { Box } from '../../../components/box/Box';
import { DotLoading } from '../../../components/dot-loading/DotLoading';
import { mutation } from '../../../services/queries';

interface StepCreateKeylessProps {
  onCreateKeylessSuccess: () => void;
}

const StyledHourglass = styled(Hourglass)({
  marginBottom: 32,
});

const Title = styled.p({
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '14px',
  textAlign: 'center',
});

const Description = styled.p(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.mutedText,
  maxWidth: 340,
  textAlign: 'center',
}));

export function StepCreateKeyless({ onCreateKeylessSuccess }: StepCreateKeylessProps) {
  const calledRef = useRef(false);

  const createKeylessWalletMutation = useMutation(mutation.createKeylessWallet());
  const getUserProfileMutation = useMutation(mutation.getUserProfile());

  const handleCreateKeylessWallet = useCallbackRef(async () => {
    try {
      await createKeylessWalletMutation.mutateAsync();
      await getUserProfileMutation.mutateAsync();

      onCreateKeylessSuccess();
    } catch (error) {
      console.debug('Failed to create keyless wallet:', error);
    }
  });

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    handleCreateKeylessWallet();
  }, []);

  return (
    <Box fullWidth vertical align="center">
      <StyledHourglass />
      <Box gap={4} mb={8} align="flex-end">
        <Title>Creating wallet</Title>
        <DotLoading />
      </Box>
      <Description>Please keep this page open.</Description>
    </Box>
  );
}
