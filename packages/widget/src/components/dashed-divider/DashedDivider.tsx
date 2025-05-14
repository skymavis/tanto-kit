import styled from '@emotion/styled';

const StyledDivider = styled.div(props => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
  fontSize: '0.6875em',
  fontWeight: 500,
  lineHeight: '0.875em',
  textTransform: 'uppercase',
  color: props.theme.mutedText,

  '&:before, &:after': {
    content: "''",
    flex: 1,
    border: props.theme.dividerBorder,
    margin: '0 0.5rem',
  },
}));

export const DashedDivider = ({ text }: { text: string }) => {
  return <StyledDivider>{text}</StyledDivider>;
};
