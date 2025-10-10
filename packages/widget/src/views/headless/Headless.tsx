import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useEffect, useMemo, useRef, useState } from 'react';

import { TransitionedView } from '../../components/animated-containers/TransitionedView';
import { Box, BoxProps } from '../../components/box/Box';
import { useWidgetConnect } from '../../contexts/widget-connect/useWidgetConnect';
import { useWidgetRouter } from '../../contexts/widget-router/useWidgetRouter';
import { useIsModal } from '../../contexts/widget-ui-config/useIsModal';
import { authEventEmitter } from '../../hooks/useAuthEffect';
import { useConnectAndAuth } from '../../hooks/useConnectAndAuth';
import { useUnmount } from '../../hooks/useUnmount';
import { ErrorCode } from '../../services/api/errorCode';
import { HttpError } from '../../services/api/HttpClient';
import { headlessInjector } from '../../services/headlessInjector';
import { ConnectState } from '../../types/connect';
import { Route } from '../../types/route';
import { PreferredMethod } from '../../types/wallet';
import { KeylessHeader } from './components/KeylessHeader';
import { StepCreateKeyless } from './components/StepCreateKeyless';
import { StepOTP } from './components/StepOTP';
import { StepReceiveNews } from './components/StepReceiveNews';
import { StepSelectProvider } from './components/StepSelectProvider';
import { StepSuccess } from './components/StepSuccess';
import { StepUpgradeToPasswordless } from './components/StepUpgradeToPasswordless';

const enum Step {
  SELECT_METHOD = 1,
  OTP = 2,
  CREATE_NEW_KEYLESS_WALLET = 3,
  UPGRADE_TO_PASSWORDLESS = 4,
  SUCCESS = 5,
  RECEIVE_NEWS = 6,
}

const STEPS_WITHOUT_BACK = new Set([Step.SUCCESS, Step.RECEIVE_NEWS, Step.CREATE_NEW_KEYLESS_WALLET]);

export function Headless(props: BoxProps) {
  const [step, setStep] = useState(Step.SELECT_METHOD);
  const [email, setEmail] = useState('');
  const [agreeReceiveNews, setAgreeReceiveNews] = useState(false);

  const isNewUser = useRef(false);

  const isModal = useIsModal();
  const { goBack: goBackRouter, replace: replaceRouter } = useWidgetRouter();
  const { selectedConnector, setSelectedWallet, waypointWallet } = useWidgetConnect();
  const { connect, status: connectStatus } = useConnectAndAuth({
    connector: selectedConnector,
  });

  const showBackButton = useMemo(() => !STEPS_WITHOUT_BACK.has(step), [step]);
  const showLogo = step === Step.SELECT_METHOD;
  const title = step === Step.SELECT_METHOD ? 'Sign in with Email & OTP' : null;

  const handleBack = useCallbackRef(() => {
    if (step === Step.SELECT_METHOD) {
      goBackRouter();
      return;
    }
    if (step === Step.UPGRADE_TO_PASSWORDLESS || step === Step.CREATE_NEW_KEYLESS_WALLET) {
      setStep(Step.SELECT_METHOD);
      isNewUser.current = false;
      return;
    }
    setStep(prev => prev - 1);
  });

  const handleSendEmailSuccess = useCallbackRef((email: string) => {
    setEmail(email);
    setStep(Step.OTP);
  });

  const handleAuthSuccess = useCallbackRef((preferMethod: PreferredMethod) => {
    if (preferMethod !== 'passwordless') {
      setStep(Step.UPGRADE_TO_PASSWORDLESS);
      return;
    }
    connect();
  });

  const handleAuthError = useCallbackRef((error: HttpError) => {
    if (error.code === ErrorCode.MPC_NOT_FOUND) {
      isNewUser.current = true;
      setStep(Step.CREATE_NEW_KEYLESS_WALLET);
    }
  });

  const handleCreateKeylessSuccess = useCallbackRef(() => {
    if (isNewUser.current) {
      setStep(Step.RECEIVE_NEWS);
      return;
    }
    connect();
  });

  const handleUpgradeSuccess = useCallbackRef(async () => {
    connect();
    setStep(Step.SUCCESS);
  });

  const handleCancelUpgrade = useCallbackRef(() => {
    if (waypointWallet) {
      setSelectedWallet(waypointWallet);
      replaceRouter(Route.CONNECT_INJECTOR, { title: waypointWallet.name });
    }
  });

  const emitAuthSuccess = useCallbackRef(async () => {
    // TODO: Improve this, we should not use headlessInjector here
    const headlessConfig = headlessInjector.resolve('headlessConfig');
    const sessionRepository = headlessInjector.resolve('sessionRepository');

    const [token, address] = await Promise.all([sessionRepository.getAccessToken(), sessionRepository.getAddress()]);

    if (token && address) {
      authEventEmitter.emit('success', {
        chainId: headlessConfig.chain.id,
        address,
        token,
      });
    }
  });

  useEffect(() => {
    if (connectStatus === ConnectState.SUCCESS) {
      emitAuthSuccess();
      if (!isNewUser.current) setStep(Step.SUCCESS);
    }
  }, [connectStatus]);

  useUnmount(() => {
    if (isModal && step === Step.RECEIVE_NEWS && connectStatus !== ConnectState.SUCCESS) connect();
    if (agreeReceiveNews) {
      // TODO: Send agreeReceiveNews to backend
      console.debug('agreeReceiveNews', agreeReceiveNews);
    }
  });

  return (
    <Box fullWidth vertical {...props}>
      <KeylessHeader
        showBackButton={showBackButton}
        onBack={handleBack}
        title={title}
        showLogo={showLogo}
        step={step}
        totalSteps={2}
      />

      <TransitionedView viewKey={step}>
        {step === Step.SELECT_METHOD && (
          <StepSelectProvider
            onSendEmailSuccess={handleSendEmailSuccess}
            onAuthSocialSuccess={handleAuthSuccess}
            onAuthSocialError={handleAuthError}
          />
        )}

        {step === Step.OTP && <StepOTP email={email} onOTPSuccess={handleAuthSuccess} onOTPError={handleAuthError} />}

        {step === Step.CREATE_NEW_KEYLESS_WALLET && (
          <StepCreateKeyless onCreateKeylessSuccess={handleCreateKeylessSuccess} />
        )}

        {step === Step.UPGRADE_TO_PASSWORDLESS && (
          <StepUpgradeToPasswordless onUpgradeSuccess={handleUpgradeSuccess} onCancelUpgrade={handleCancelUpgrade} />
        )}

        {step === Step.RECEIVE_NEWS && (
          <StepReceiveNews checked={agreeReceiveNews} setChecked={setAgreeReceiveNews} onComplete={connect} />
        )}

        {step === Step.SUCCESS && <StepSuccess />}
      </TransitionedView>
    </Box>
  );
}
