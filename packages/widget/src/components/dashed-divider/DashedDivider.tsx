import styled from '@emotion/styled';

const StyledDivider = styled.div<{ uppercase?: boolean }>(props => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
  fontSize: props.uppercase ? '0.6875em' : '0.875em',
  fontWeight: 500,
  lineHeight: '0.875em',
  textTransform: props.uppercase ? 'uppercase' : 'none',
  color: props.theme.mutedText,

  '&:before, &:after': {
    content: "''",
    flex: 1,
    border: props.theme.dividerBorder,
    margin: '0 0.5rem',
  },
}));

export function DashedDivider({ text, uppercase = true }: { text: string; uppercase?: boolean }) {
  return <StyledDivider uppercase={uppercase}>{text}</StyledDivider>;
}
