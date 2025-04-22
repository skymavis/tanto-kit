import styled from '@emotion/styled';
import { memo } from 'react';

const StyledDivider = styled.div({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
  fontSize: 11,
  fontWeight: 500,
  lineHeight: '14px',
  textTransform: 'uppercase',
  color: 'rgba(205, 213, 229, 0.75)',

  '&::before, &::after': {
    content: "''",
    flex: 1,
    borderTop: 'solid 1.5px #353A45',
    margin: '0 0.5rem',
    borderStyle: 'dashed',
  },
});

export const DashedDivider = memo(({ text }: { text: string }) => {
  return <StyledDivider>{text}</StyledDivider>;
});
