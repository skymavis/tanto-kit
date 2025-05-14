import { useTheme } from '@emotion/react';
import { SVGProps } from 'react';

export const RoninBadge = (props: SVGProps<SVGSVGElement>) => {
  const theme = useTheme();

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g clipPath="url(#a)">
        <path d="M13 1H7a6 6 0 0 0-6 6v6a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V7a6 6 0 0 0-6-6" fill="#007FF5" />
        <path
          d="M13 1H7a6 6 0 0 0-6 6v6a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V7a6 6 0 0 0-6-6Z"
          stroke={theme.colors.background}
          strokeWidth="2"
        />
        <path
          d="M13.998 8.388V6.13c0-.3-.135-.586-.375-.798A1.37 1.37 0 0 0 12.718 5H7.28c-.34 0-.665.119-.905.33-.24.213-.375.5-.375.8v6.554c0 .17.043.336.126.489s.204.286.354.392l1.98 1.404a.18.18 0 0 0 .17.018.16.16 0 0 0 .066-.053.13.13 0 0 0 .025-.076v-4.634q.001-.059.047-.1a.17.17 0 0 1 .113-.041h1.44c.254 0 .498.089.678.248a.8.8 0 0 1 .281.599v3.928a.13.13 0 0 0 .025.075q.025.035.066.053a.18.18 0 0 0 .169-.018l1.98-1.403c.15-.106.27-.24.354-.392a1 1 0 0 0 .126-.489v-2.036c0-.3-.135-.587-.375-.8a1.37 1.37 0 0 0-.905-.33c.34 0 .664-.12.904-.332.24-.211.374-.498.374-.798m-3.68.565H8.88a.17.17 0 0 1-.113-.041.13.13 0 0 1-.047-.1V6.271q.001-.059.047-.1a.17.17 0 0 1 .113-.042h2.24a.17.17 0 0 1 .113.042q.046.041.046.1v1.835a.8.8 0 0 1-.28.6c-.18.158-.425.247-.68.247"
          fill="#fff"
        />
      </g>
      <defs>
        <linearGradient id="c" x1="10" y1="5" x2="10" y2="15" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fff" />
          <stop offset=".458" stop-color="#fff" />
          <stop offset="1" stop-color="#fff" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
        <pattern id="b" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_118_44" transform="translate(-.034 -.003)scale(.00302)" />
        </pattern>
      </defs>
    </svg>
  );
};
