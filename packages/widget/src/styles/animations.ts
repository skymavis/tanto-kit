import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: 'translateY(2%) scale(0.95)';
  }
  to {
    opacity: 1;
    transform: 'translateY(0%) scale(1)';
  },
`;

export const fadeOutDown = keyframes`
  from {
    opacity: 1;
    transform: 'translateY(0%) scale(1)';
  }
  to {
    opacity: 0;
    transform: 'translateY(2%) scale(0.95)';
  },
`;

export const spin = keyframes`
  to {
    transform: rotate(1turn)
  }
`;
export const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
