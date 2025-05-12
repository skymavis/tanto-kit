import styled from '@emotion/styled';

const StyledDivider = styled.div(props => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
  fontSize: 11,
  fontWeight: 500,
  lineHeight: '14px',
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
