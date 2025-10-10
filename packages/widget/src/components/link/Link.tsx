import styled from '@emotion/styled';
import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const StyledLink = styled.a(({ theme }) => ({
  color: theme.linkColor,
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export function Link({ children, ...props }: PropsWithChildren<LinkProps>) {
  return <StyledLink {...props}>{children}</StyledLink>;
}
