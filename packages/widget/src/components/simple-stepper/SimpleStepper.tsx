import styled from '@emotion/styled';

import { hasValue } from '../../utils/common';

type SimpleStepperProps = {
  step: number | undefined | null;
  total: number | undefined | null;
} & React.HTMLAttributes<HTMLDivElement>;

const StepsContainer = styled.div({
  display: 'flex',
  gap: 2,
});

const Step = styled.div<{ active: boolean }>(
  {
    borderRadius: 1,
    width: 12,
    height: 4,
  },
  ({ theme, active }) => {
    return {
      backgroundColor: active ? theme.buttonPrimaryBackground : theme.buttonDisabledBackground,
    };
  },
);

export function SimpleStepper(props: SimpleStepperProps) {
  const { step, total, className, ...restProps } = props;

  if (!hasValue(step) || !hasValue(total) || step > total) return null;

  return (
    <StepsContainer className={className} {...restProps}>
      {Array.from({ length: total }, (_, index) => (
        <Step key={index} active={index < step} />
      ))}
    </StepsContainer>
  );
}
