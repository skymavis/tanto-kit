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

export const shake = keyframes`
  0%{ transform:none; }
  25%{ transform:translateX(2px); }
  50%{ transform:translateX(-2px); }
  75%{ transform:translateX(2px); }
  100%{ transform:none; }
`;

export const shine = keyframes`
  0%{ background-position: 0% 0; }
  100%{ background-position: -200% 0; }
`;
