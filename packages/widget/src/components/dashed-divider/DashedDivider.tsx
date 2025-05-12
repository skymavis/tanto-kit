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
  color: props.theme.colors.neutral,

  '&:before, &:after': {
    content: "''",
    flex: 1,
    border: `solid 1px ${props.theme.colors.border}`,
    margin: '0 0.5rem',
    borderStyle: 'dashed',
  },
}));

export const DashedDivider = ({ text }: { text: string }) => {
  return <StyledDivider>{text}</StyledDivider>;
};
