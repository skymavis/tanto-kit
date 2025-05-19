import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { memo, useMemo } from 'react';

import { DELAY_CONNECT } from '../../constants';
import { shine } from '../../styles/animations';
import { hasOpacity } from '../../utils/color';

const SIZE = 236;
const INSET = 8;
const SVG_SIZE = SIZE - INSET * 2;
const RADIUS = 24;
const DOT_COLOR = 'rgba(32, 31, 29, 0.4)';

const corners = [
  { position: { top: 0, left: 0 }, rotate: 0 },
  { position: { top: 0, right: 1 }, rotate: 90 },
  { position: { bottom: 1, left: 0 }, rotate: -90 },
];

const Container = styled.div(({ theme }) => ({
  position: 'absolute',
  overflow: 'hidden',
  borderRadius: RADIUS,
  width: SIZE,
  height: SIZE,
  background: theme.qrcodeBackground,
}));

const Dots = styled.div({
  position: 'absolute',
  inset: 9,
  '&:before': {
    pointerEvents: 'none',
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundRepeat: 'repeat',
    backgroundSize: '1.786% 1.786%',
    backgroundImage: `radial-gradient(${DOT_COLOR} 30%, transparent 30%)`,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    pointerEvents: 'none',
    transform: 'scale(1.5) rotate(45deg)',
    backgroundSize: '200% 100%',
    backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, 0.9), transparent)',
    willChange: 'background-position',
    animation: `${shine} 1150ms linear infinite both`,
    animationDelay: `${DELAY_CONNECT}ms`,
  },
});

const CornerContainer = styled.div({ position: 'absolute', inset: INSET, zIndex: 1 });

const CornerSvg = styled.svg<{
  position?: { top?: number; bottom?: number; left?: number; right?: number };
  rotate?: number;
}>(({ position = {}, rotate = 0 }) => ({
  position: 'absolute',
  ...position,
  transform: rotate ? `rotate(${rotate}deg)` : undefined,
}));

const CornerPath = () => {
  const theme = useTheme();
  const showCorner = useMemo(() => !hasOpacity(theme.qrcodeBackground), [theme]);

  if (!showCorner) return null;

  return (
    <>
      <path d="M0 0h24v16a8 8 0 0 1-8 8H0z" fill={theme.qrcodeBackground} />
      <mask id="qrcode-cornor-border" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 7.5v6A7.5 7.5 0 0 0 7.5 21h6a7.5 7.5 0 0 0 7.5-7.5v-6A7.5 7.5 0 0 0 13.5 0h-6A7.503 7.503 0 0 0 0 7.5M7.5 3h6A4.5 4.5 0 0 1 18 7.5v6a4.503 4.503 0 0 1-4.5 4.5h-6A4.5 4.5 0 0 1 3 13.5v-6A4.5 4.5 0 0 1 7.5 3"
          fill="#fff"
        />
      </mask>
      <g mask="url(#qrcode-cornor-border)">
        <path d="M21 0H0v21h21z" fill={DOT_COLOR} />
      </g>
      <mask id="qrcode-cornor-dot" maskUnits="userSpaceOnUse" x="6" y="6" width="9" height="9">
        <path d="M10.5 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9" fill="#fff" />
      </mask>
      <g mask="url(#qrcode-cornor-dot)">
        <path d="M15 6H6v9h9z" fill={DOT_COLOR} />
      </g>
    </>
  );
};

const LogoOverlay = () => {
  const theme = useTheme();
  return (
    <svg
      css={{
        position: 'absolute',
        inset: INSET,
        zIndex: 3,
      }}
      width={SVG_SIZE}
      height={SVG_SIZE}
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M86 94a8 8 0 0 1 8-8h31a8 8 0 0 1 8 8v31a8 8 0 0 1-8 8H94a8 8 0 0 1-8-8z"
        fill={theme.qrcodeBackground}
      />
      <g clipPath="url(#clip2)">
        <path
          d="M124.125 90h-29.25A4.875 4.875 0 0 0 90 94.875v29.25A4.875 4.875 0 0 0 94.875 129h29.25a4.875 4.875 0 0 0 4.875-4.875v-29.25A4.875 4.875 0 0 0 124.125 90"
          fill="#0C6FFF"
        />
        <path
          d="M101.685 104.449a11.06 11.06 0 0 1 12.044-2.396 11.1 11.1 0 0 1 3.586 2.396l.519.52a.55.55 0 0 1 0 .78l-1.777 1.778a.28.28 0 0 1-.39 0l-.716-.716a7.71 7.71 0 0 0-10.902 0l-.766.766a.28.28 0 0 1-.39 0l-1.778-1.777a.554.554 0 0 1 0-.78zm19.304 3.675 1.581 1.581a.553.553 0 0 1 0 .781l-7.13 7.13a.56.56 0 0 1-.39.163.55.55 0 0 1-.391-.163l-5.062-5.059a.14.14 0 0 0-.195 0l-5.06 5.06a.56.56 0 0 1-.391.162.55.55 0 0 1-.391-.162l-7.13-7.13a.55.55 0 0 1 0-.782l1.58-1.581a.56.56 0 0 1 .391-.162.55.55 0 0 1 .391.162l5.062 5.06a.1.1 0 0 0 .044.031.1.1 0 0 0 .053.011.1.1 0 0 0 .053-.011.1.1 0 0 0 .045-.031l5.06-5.06a.56.56 0 0 1 .39-.162.55.55 0 0 1 .391.162l5.061 5.06a.1.1 0 0 0 .045.031.1.1 0 0 0 .053.011.1.1 0 0 0 .053-.011.1.1 0 0 0 .044-.031l5.062-5.06a.56.56 0 0 1 .391-.162.55.55 0 0 1 .39.162"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="clip2">
          <path fill="#fff" d="M90 90h39v39H90z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const QRCodePlaceholder = memo(() => {
  return (
    <Container>
      <Dots />
      <CornerContainer>
        {corners.map((corner, index) => (
          <CornerSvg
            key={index}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...corner}
          >
            <CornerPath />
          </CornerSvg>
        ))}
      </CornerContainer>
      <LogoOverlay />
    </Container>
  );
});
