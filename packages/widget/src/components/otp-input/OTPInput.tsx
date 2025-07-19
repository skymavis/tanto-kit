import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { OTPInputProps, SlotProps } from 'input-otp';
import { OTPInput as OTPInputComponent } from 'input-otp';
import { forwardRef } from 'react';

interface CodeInputShareProps {
  isDisabled?: boolean;
  secure?: boolean;
}

type CodeInputProps = Omit<OTPInputProps, 'render' | 'children' | 'maxLength' | 'disabled'> &
  CodeInputShareProps & {
    isError?: boolean;
    length?: number;
  };

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
`;

const caretBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const StyledSlot = styled.div<{ isActive: boolean; isDisabled: boolean }>(
  {
    position: 'relative',
    width: 44,
    height: 48,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    borderRadius: '10px',
    border: '1px solid',
    outline: '0px solid transparent',
    outlineOffset: '0px',
  },
  ({ theme, isActive, isDisabled }) => ({
    borderColor: isDisabled
      ? theme.inputFocusBorderColor
      : isActive
      ? theme.inputFocusBorderColor
      : theme.inputBorderColor,
    outlineWidth: isActive ? '4px' : '0px',
    cursor: isDisabled ? 'not-allowed' : 'default',
  }),
);

const StyledCaret = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  animation: ${caretBlink} 1s infinite;
`;

const StyledCaretLine = styled.div(({ theme }) => ({
  width: '2px',
  height: '1rem',
  backgroundColor: theme.bodyText,
}));

const StyledContainer = styled.div<{ isError: boolean }>(
  {
    display: 'flex',
    alignItems: 'center',
  },
  ({ isError }) => ({
    '@media (prefers-reduced-motion: no-preference)': {
      animation: isError ? `${shake} 0.15s ease-in-out 0s 2` : 'none',
    },
  }),
);

const StyledSlotContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Slot({ isActive, char, hasFakeCaret, secure, isDisabled }: SlotProps & CodeInputShareProps) {
  return (
    <StyledSlot isActive={isActive} isDisabled={isDisabled || false}>
      {char !== null && <span>{secure ? '•' : char}</span>}
      {hasFakeCaret && (
        <StyledCaret>
          <StyledCaretLine />
        </StyledCaret>
      )}
    </StyledSlot>
  );
}

export const OTPInput = forwardRef<HTMLInputElement, CodeInputProps>(
  ({ isError = false, length = 6, secure, isDisabled, ...props }, ref) => {
    return (
      <OTPInputComponent
        ref={ref}
        containerClassName=""
        autoFocus
        {...props}
        disabled={isDisabled}
        maxLength={length}
        render={({ slots }) => (
          <StyledContainer isError={isError}>
            <StyledSlotContainer>
              {slots.map(slot => (
                <Slot {...slot} isDisabled={isDisabled} secure={secure} />
              ))}
            </StyledSlotContainer>
          </StyledContainer>
        )}
      />
    );
  },
);
