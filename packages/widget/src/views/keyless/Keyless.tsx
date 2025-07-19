import { useState } from 'react';

import { TransitionedView } from '../../components/animated-containers/TransitionedView';
import { Box } from '../../components/box/Box';
import { useWidgetModal } from '../../contexts/widget-modal/useWidgetModal';
import { useWidgetRouter } from '../../contexts/widget-router/useWidgetRouter';
import { KeylessHeader } from './components/KeylessHeader';
import { StepCreatingKeyless } from './components/StepCreatingKeyless';
import { StepMigratePassword } from './components/StepMigratePassword';
import { StepOTP } from './components/StepOTP';
import { StepSelectProvider } from './components/StepSelectProvider';
import { StepSuccess } from './components/StepSuccess';

enum Step {
  SELECT_METHOD = 1,
  OTP = 2,
  CREATE_NEW_KEYLESS_WALLET = 3,
  MIGRATE_PASSWORD_LESS = 4,
  SUCCESS = 5,
}

interface EmailFormData {
  email: string;
}

interface PasswordLessFormData {
  password: string;
}

export function Keyless() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(Step.SELECT_METHOD);
  const [email, setEmail] = useState('');
  const { hide } = useWidgetModal();
  const { goBack } = useWidgetRouter();

  const handleEmailSubmit = (data: EmailFormData) => {
    setEmail(data.email);
    setStep(Step.OTP);
  };

  const handleBack = () => {
    if (step === Step.SELECT_METHOD) {
      goBack();
      return;
    }
    if (step === Step.MIGRATE_PASSWORD_LESS) {
      setStep(Step.SELECT_METHOD);
      return;
    }
    setStep(step - 1);
  };

  const handleSubmitOTP = async (_code: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    const randomStep =
      Math.random() > 0.5
        ? Step.MIGRATE_PASSWORD_LESS
        : Math.random() > 0.5
        ? Step.CREATE_NEW_KEYLESS_WALLET
        : Step.SUCCESS;
    setStep(randomStep);
  };

  const handleResend = async () => {};

  const handlePasswordLessSubmit = (_data: PasswordLessFormData) => {
    setStep(Step.SUCCESS);
  };

  const showBackButton = step !== Step.SUCCESS;
  const showLogo = step === Step.SELECT_METHOD;
  const title = step === Step.SELECT_METHOD ? 'Sign in with Email & OTP' : undefined;

  return (
    <Box fullWidth vertical>
      <KeylessHeader showBackButton={showBackButton} onBack={handleBack} title={title} showLogo={showLogo} />

      <TransitionedView viewKey={step}>
        {step === Step.SELECT_METHOD && <StepSelectProvider onSubmit={handleEmailSubmit} />}

        {step === Step.OTP && (
          <StepOTP email={email} onOTPSubmit={handleSubmitOTP} onResend={handleResend} isLoading={isLoading} />
        )}

        {step === Step.MIGRATE_PASSWORD_LESS && <StepMigratePassword onSubmit={handlePasswordLessSubmit} />}

        {step === Step.CREATE_NEW_KEYLESS_WALLET && <StepCreatingKeyless />}

        {step === Step.SUCCESS && <StepSuccess />}
      </TransitionedView>
    </Box>
  );
}
