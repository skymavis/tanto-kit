import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface DotLoadingProps {
  size?: number;
}

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
`;

const StyledDotContainer = styled.div<{ size: number }>(
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ({ size }) => ({
    width: `${size * 4}px`,
    height: `${size}px`,
  }),
);

const StyledDot = styled.div<{ size: number; delay: number }>(
  {
    borderRadius: '50%',
    animation: `${bounce} 1.2s infinite ease-in-out`,
  },
  ({ theme, size, delay }) => ({
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: theme.bodyText,
    animationDelay: `${delay}s`,
  }),
);

export function DotLoading({ size = 4 }: DotLoadingProps) {
  return (
    <StyledDotContainer size={size}>
      <StyledDot size={size} delay={0} />
      <StyledDot size={size} delay={0.2} />
      <StyledDot size={size} delay={0.4} />
    </StyledDotContainer>
  );
}
