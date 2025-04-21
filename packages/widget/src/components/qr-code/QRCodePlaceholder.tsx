import styled from '@emotion/styled';

import { shine } from '../../styles/animations';

const SIZE = 236;
const BACKGROUND = '#F1F3F9';
const DOT_COLOR = 'rgba(32, 31, 29, 0.4)';
const SVG_SIZE = 220;

const Container = styled.div({
  position: 'absolute',
  width: SIZE,
  height: SIZE,
  background: BACKGROUND,
  padding: 8,
  borderRadius: 12,
  overflow: 'hidden',
});

const Shine = styled.div({
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  transform: 'scale(1.5) rotate(45deg)',
  backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, 0.9), transparent)',
  backgroundSize: '200% 100%',
  animation: `${shine} 1100ms linear infinite`,
  pointerEvents: 'none',
});

const LogoPath = () => (
  <>
    <path
      d="M124.125 90h-29.25A4.875 4.875 0 0 0 90 94.875v29.25A4.875 4.875 0 0 0 94.875 129h29.25a4.875 4.875 0 0 0 4.875-4.875v-29.25A4.875 4.875 0 0 0 124.125 90"
      fill="#0C6FFF"
    />
    <path
      d="M101.685 104.449a11.06 11.06 0 0 1 12.044-2.396 11.1 11.1 0 0 1 3.586 2.396l.519.52a.55.55 0 0 1 0 .78l-1.777 1.778a.28.28 0 0 1-.39 0l-.716-.716a7.71 7.71 0 0 0-10.902 0l-.766.766a.28.28 0 0 1-.39 0l-1.778-1.777a.554.554 0 0 1 0-.78zm19.304 3.675 1.581 1.581a.553.553 0 0 1 0 .781l-7.13 7.13a.56.56 0 0 1-.39.163.55.55 0 0 1-.391-.163l-5.062-5.059a.14.14 0 0 0-.195 0l-5.06 5.06a.56.56 0 0 1-.391.162.55.55 0 0 1-.391-.162l-7.13-7.13a.55.55 0 0 1 0-.782l1.58-1.581a.56.56 0 0 1 .391-.162.55.55 0 0 1 .391.162l5.062 5.06a.1.1 0 0 0 .044.031.1.1 0 0 0 .053.011.1.1 0 0 0 .053-.011.1.1 0 0 0 .045-.031l5.06-5.06a.56.56 0 0 1 .39-.162.55.55 0 0 1 .391.162l5.061 5.06a.1.1 0 0 0 .045.031.1.1 0 0 0 .053.011.1.1 0 0 0 .053-.011.1.1 0 0 0 .044-.031l5.062-5.06a.56.56 0 0 1 .391-.162.55.55 0 0 1 .39.162"
      fill="#fff"
    />
  </>
);

export const QRCodePlaceholder = () => {
  return (
    <Container>
      <svg
        css={{ position: 'absolute', zIndex: 1 }}
        width={SVG_SIZE}
        height={SVG_SIZE}
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-right corner */}
        <path d="M195 0h24v24h-16a8 8 0 0 1-8-8z" fill={BACKGROUND} />
        <mask id="mask1" maskUnits="userSpaceOnUse" x="198" y="0" width="21" height="21">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M198 7.5v6a7.5 7.5 0 0 0 7.5 7.5h5.999A7.5 7.5 0 0 0 219 13.5v-6a7.5 7.5 0 0 0-7.501-7.5H205.5a7.503 7.503 0 0 0-7.5 7.5m7.5-4.5h5.999A4.5 4.5 0 0 1 216 7.5v6a4.5 4.5 0 0 1-4.501 4.5H205.5a4.5 4.5 0 0 1-4.501-4.5v-6A4.5 4.5 0 0 1 205.5 3"
            fill="#fff"
          />
        </mask>
        <g mask="url(#mask1)">
          <path d="M219 0h-21v21h21z" fill={DOT_COLOR} />
        </g>
        <mask id="mask2" maskUnits="userSpaceOnUse" x="204" y="6" width="9" height="9">
          <path d="M208.5 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9" fill="#fff" />
        </mask>
        <g mask="url(#mask2)">
          <path d="M213 6h-9v9h9z" fill={DOT_COLOR} />
        </g>

        {/* Top-left corner */}
        <path d="M0 0h24v16a8 8 0 0 1-8 8H0z" fill={BACKGROUND} />
        <mask id="mask3" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 7.5v6A7.5 7.5 0 0 0 7.5 21h6a7.5 7.5 0 0 0 7.5-7.5v-6A7.5 7.5 0 0 0 13.5 0h-6A7.503 7.503 0 0 0 0 7.5M7.5 3h6A4.5 4.5 0 0 1 18 7.5v6a4.503 4.503 0 0 1-4.5 4.5h-6A4.5 4.5 0 0 1 3 13.5v-6A4.5 4.5 0 0 1 7.5 3"
            fill="#fff"
          />
        </mask>
        <g mask="url(#mask3)">
          <path d="M21 0H0v21h21z" fill={DOT_COLOR} />
        </g>
        <mask id="mask4" maskUnits="userSpaceOnUse" x="6" y="6" width="9" height="9">
          <path d="M10.5 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9" fill="#fff" />
        </mask>
        <g mask="url(#mask4)">
          <path d="M15 6H6v9h9z" fill={DOT_COLOR} />
        </g>

        {/* Bottom-left corner */}
        <path d="M0 195h16a8 8 0 0 1 8 8v16H0z" fill={BACKGROUND} />
        <mask id="mask5" maskUnits="userSpaceOnUse" x="0" y="198" width="21" height="21">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 205.5v6a7.5 7.5 0 0 0 7.5 7.5h6a7.497 7.497 0 0 0 7.5-7.5v-6a7.5 7.5 0 0 0-7.5-7.5h-6a7.5 7.5 0 0 0-7.5 7.5m7.5-4.5h6a4.5 4.5 0 0 1 4.5 4.5v6a4.5 4.5 0 0 1-4.5 4.5h-6a4.5 4.5 0 0 1-4.5-4.5v-6a4.5 4.5 0 0 1 4.5-4.5"
            fill="#fff"
          />
        </mask>
        <g mask="url(#mask5)">
          <path d="M21 198H0v21h21z" fill={DOT_COLOR} />
        </g>
        <mask id="mask6" maskUnits="userSpaceOnUse" x="6" y="204" width="9" height="9">
          <path d="M10.5 213a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9" fill="#fff" />
        </mask>
        <g mask="url(#mask6)">
          <path d="M15 204H6v9h9z" fill={DOT_COLOR} />
        </g>

        {/* Center logo */}
        <path d="M86 94a8 8 0 0 1 8-8h31a8 8 0 0 1 8 8v31a8 8 0 0 1-8 8H94a8 8 0 0 1-8-8z" fill={BACKGROUND} />
        <g clipPath="url(#clip1)">
          <LogoPath />
        </g>
        <defs>
          <clipPath id="clip1">
            <path fill="#fff" d="M90 90h39v39H90z" />
          </clipPath>
        </defs>
      </svg>

      {/* Logo overlay */}
      <svg
        css={{ position: 'absolute', zIndex: 3 }}
        width={SVG_SIZE}
        height={SVG_SIZE}
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M86 94a8 8 0 0 1 8-8h31a8 8 0 0 1 8 8v31a8 8 0 0 1-8 8H94a8 8 0 0 1-8-8z" fill={BACKGROUND} />
        <g clipPath="url(#clip2)">
          <LogoPath />
        </g>
        <defs>
          <clipPath id="clip2">
            <path fill="#fff" d="M90 90h39v39H90z" />
          </clipPath>
        </defs>
      </svg>

      <svg width={SVG_SIZE} height={SVG_SIZE} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={DOT_COLOR} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <Shine />
    </Container>
  );
};
