import { keyframes, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { OTPInputProps, SlotProps } from 'input-otp';
import { OTPInput as OTPInputComponent } from 'input-otp';
import { CSSProperties, forwardRef } from 'react';

import { Box } from '../box/Box';

interface CodeInputShareProps {
  isLoading?: boolean;
  isSuccess?: boolean;
  secure?: boolean;
  isError?: boolean;
}

type CodeInputProps = Omit<OTPInputProps, 'render' | 'children' | 'maxLength' | 'disabled'> &
  CodeInputShareProps & {
    error?: string;
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

const borderLoading = (fromColor: string) => keyframes`
  0% { box-shadow: 0 0 0 0 ${fromColor}; }
  50% { box-shadow: 0 0 0 2px var(--loading-color); }
  100% { box-shadow: 0 0 0 0 ${fromColor}; }
`;

const borderLoadingSuccess = (fromColor: string, toColor: string) => keyframes`
  0% { box-shadow: 0 0 0 1px ${fromColor}; }
  100% { box-shadow: 0 0 0 2px ${toColor}; }
`;

const StyledSlot = styled.div<{
  isActive: boolean;
  isLoading: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}>(
  {
    position: 'relative',
    width: 44,
    height: 48,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    border: '1px solid',
    transition: 'all 0.3s ease',
  },
  ({ theme, isActive, isLoading, isError, isSuccess }) => {
    const borderColor = isError ? theme.errorColor : isActive || isSuccess ? theme.inputFocusBorder : theme.inputBorder;

    return {
      borderColor,
      cursor: isLoading ? 'not-allowed' : 'default',
      animation: isSuccess
        ? `${borderLoadingSuccess(theme.inputFocusBorder, theme.successColor)} 0.2s linear forwards`
        : isLoading
        ? `${borderLoading(theme.inputBorder)} 1.5s linear infinite`
        : undefined,
    };
  },
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
  width: 2,
  height: 16,
  backgroundColor: theme.bodyText,
}));

const StyledContainer = styled.div<{ isError?: boolean }>(
  {
    display: 'flex',
    alignItems: 'center',
  },
  ({ isError }) => ({
    animation: isError ? `${shake} 0.15s ease-in-out` : 'none',
  }),
);

const StyledSlotContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

const StyledError = styled.div(({ theme }) => ({
  color: theme.errorColor,
  fontSize: 14,
}));

type SlotWithProps = SlotProps & CodeInputShareProps;

function Slot({ isActive, char, hasFakeCaret, secure, isLoading = false, isError, isSuccess }: SlotWithProps) {
  const theme = useTheme();

  return (
    <StyledSlot
      style={
        {
          '--loading-color': isSuccess ? theme.successColor : theme.inputFocusBorder,
        } as CSSProperties
      }
      isActive={isActive}
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
    >
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
  ({ length = 6, secure, isLoading, error, isSuccess, ...props }, ref) => {
    const hasError = !!error;
    const isFull = props.value?.length === length;

    return (
      <Box vertical gap={4}>
        <OTPInputComponent
          ref={ref}
          {...props}
          disabled={isLoading}
          maxLength={length}
          render={({ slots }) => (
            <StyledContainer isError={hasError}>
              <StyledSlotContainer>
                {slots.map((slot, index) => (
                  <Slot
                    key={index}
                    {...slot}
                    isActive={slot.isActive || isFull}
                    isLoading={!!isLoading}
                    secure={secure}
                    isError={hasError}
                    isSuccess={isSuccess}
                  />
                ))}
              </StyledSlotContainer>
            </StyledContainer>
          )}
        />
        {hasError && <StyledError>{error}</StyledError>}
      </Box>
    );
  },
);
