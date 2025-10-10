import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { CommunicateHelper, openPopup } from '@sky-mavis/waypoint';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { Box } from '../../../components/box/Box';
import { Button } from '../../../components/button/Button';
import { DashedDivider } from '../../../components/dashed-divider/DashedDivider';
import { Spinner } from '../../../components/spinner/Spinner';
import { useTantoConfig } from '../../../contexts/tanto/useTantoConfig';
import { HttpError } from '../../../services/api/HttpClient';
import { mutation } from '../../../services/queries';
import { SOCIAL_PROVIDERS, SocialProvider } from '../../../types/social';
import { PreferredMethod } from '../../../types/wallet';
import { isClient } from '../../../utils/common';

const WAYPOINT_BASE_URL = 'https://id.skymavis.one';

interface SocialButtonsProps {
  onSuccess: (preferMethod: PreferredMethod) => void;
  onError: (error: HttpError) => void;
}

interface SocialSignInResponse {
  address: string;
  id_token: string;
  secondary_address: string;
}

export function SocialButtons({ onSuccess, onError }: SocialButtonsProps) {
  const { clientId, excludedSocialProviders } = useTantoConfig();
  const [selectedProvider, setSelectedProvider] = useState<SocialProvider | null>(null);

  const popupCommunicator = useMemo(() => new CommunicateHelper(WAYPOINT_BASE_URL), []);
  const origin = useMemo(() => (isClient() ? window.location.origin : undefined), []);

  const popupOptions = useMemo(
    () => ({
      clientId,
      origin,
      redirect: origin,
      scope: 'wallet',
    }),
    [clientId, origin],
  );

  const exchangeTokenMutation = useMutation(mutation.exchangeToken());
  const getUserProfileMutation = useMutation(mutation.getUserProfile());

  const authorizeWithSocialMutation = useMutation({
    mutationKey: ['tantoAuthorizeWithSocial'],
    mutationFn: (provider: SocialProvider) =>
      popupCommunicator.sendRequest<SocialSignInResponse>(async state =>
        openPopup(`${WAYPOINT_BASE_URL}/authorize/${provider}`, {
          state,
          ...popupOptions,
        }),
      ),
  });

  const handleSocialSignIn = useCallbackRef(async (provider: SocialProvider) => {
    try {
      setSelectedProvider(provider);
      const { id_token: idToken } = await authorizeWithSocialMutation.mutateAsync(provider);
      await exchangeTokenMutation.mutateAsync({ idToken });
      const { preferMethod } = await getUserProfileMutation.mutateAsync();
      onSuccess(preferMethod);
    } catch (error) {
      console.debug(`${provider} sign-in failed:`, error);
      setSelectedProvider(null);
      if (error instanceof HttpError) onError(error);
    }
  });

  const handlers = useMemo(
    () => ({
      google: () => handleSocialSignIn('google'),
      apple: () => handleSocialSignIn('apple'),
      facebook: () => handleSocialSignIn('facebook'),
    }),
    [handleSocialSignIn],
  );

  const isLoading = authorizeWithSocialMutation.isPending || exchangeTokenMutation.isPending;

  const filteredSocialProviders = useMemo(
    () =>
      (Object.keys(SOCIAL_PROVIDERS) as SocialProvider[]).filter(
        provider => !excludedSocialProviders?.includes(provider),
      ),
    [excludedSocialProviders],
  );

  if (filteredSocialProviders.length === 0) return null;

  return (
    <Box vertical gap={16}>
      <DashedDivider text="Or continue with" uppercase={false} />

      <Box justify="space-between" align="center" gap={12}>
        {filteredSocialProviders.map(provider => {
          const { icon: Icon } = SOCIAL_PROVIDERS[provider];
          const isCurrentProviderLoading = selectedProvider === provider;

          return (
            <Button key={provider} fullWidth intent="secondary" onClick={handlers[provider]} disabled={isLoading}>
              {isCurrentProviderLoading ? <Spinner size="small" /> : <Icon width={20} height={20} />}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
