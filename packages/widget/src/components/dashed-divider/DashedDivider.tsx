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
  color: props.theme.neutralColor,

  '&:before, &:after': {
    content: "''",
    flex: 1,
    borderTop: `solid 1.5px ${props.theme.borderColor}`,
    margin: '0 0.5rem',
    borderStyle: 'dashed',
  },
}));

export const DashedDivider = ({ text }: { text: string }) => {
  return <StyledDivider>{text}</StyledDivider>;
};
