import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import React from 'react';

import { CheckIcon } from '../../assets/CheckIcon';
import { Fade } from '../animated-containers/Fade';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const CheckboxContainer = styled.label({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '0.5rem',
});

const StyledRoot = styled(RadixCheckbox.Root)(({ theme }) => ({
  width: 20,
  height: 20,
  border: `1px solid ${theme.checkboxBorder}`,
  borderRadius: 4,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.checkboxBackground,
  transition: 'background-color 0.2s ease, border-color 0.2s ease',

  '&:hover': {
    backgroundColor: theme.checkboxHoverBackground,
    borderColor: theme.checkboxHoverBorder,
  },

  '&[data-disabled]': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&[data-state="checked"]': {
    backgroundColor: theme.checkboxCheckedBackground,
    borderColor: 'transparent',

    '&:hover': {
      backgroundColor: theme.checkboxCheckedHoverBackground,
    },
  },
}));

const StyledIndicator = styled(RadixCheckbox.Indicator)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const LabelText = styled.span(({ theme }) => ({
  color: theme.bodyText,
}));

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  const theme = useTheme();

  return (
    <CheckboxContainer>
      <StyledRoot checked={checked} onCheckedChange={onChange}>
        <StyledIndicator forceMount>
          <Fade show={!!checked} transition={{ duration: 0.15 }}>
            <CheckIcon size={16} color={theme.bodyText} />
          </Fade>
        </StyledIndicator>
      </StyledRoot>
      {label && <LabelText>{label}</LabelText>}
    </CheckboxContainer>
  );
};
