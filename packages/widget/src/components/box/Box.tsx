import styled from '@emotion/styled';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

type Spacing = number | string;

type JustifyContent = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

type AlignItems = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'baseline' | 'stretch';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  gap?: Spacing;
  flex?: number | string;
  fullWidth?: boolean;
  justify?: JustifyContent;
  align?: AlignItems;

  p?: Spacing;
  pt?: Spacing;
  pr?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  px?: Spacing;
  py?: Spacing;

  m?: Spacing;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mx?: Spacing;
  my?: Spacing;
}

const StyledBox = styled.div<BoxProps>(
  {
    display: 'flex',
  },
  ({
    vertical,
    justify,
    align,
    flex,
    fullWidth,
    gap,

    p,
    pt,
    pr,
    pb,
    pl,
    px,
    py,
    m,
    mt,
    mr,
    mb,
    ml,
    mx,
    my,
  }) => ({
    flex: flex ?? undefined,
    width: fullWidth ? '100%' : undefined,
    flexDirection: vertical ? 'column' : 'row',
    justifyContent: justify ?? undefined,
    alignItems: align ?? undefined,
    gap: gap ?? undefined,

    paddingTop: pt ?? py ?? p,
    paddingRight: pr ?? px ?? p,
    paddingBottom: pb ?? py ?? p,
    paddingLeft: pl ?? px ?? p,

    marginTop: mt ?? my ?? m,
    marginRight: mr ?? mx ?? m,
    marginBottom: mb ?? my ?? m,
    marginLeft: ml ?? mx ?? m,
  }),
);

export const Box = forwardRef<HTMLDivElement, BoxProps>(({ children, ...rest }, ref) => {
  return (
    <StyledBox {...rest} ref={ref}>
      {children}
    </StyledBox>
  );
});

Box.displayName = 'Box';
