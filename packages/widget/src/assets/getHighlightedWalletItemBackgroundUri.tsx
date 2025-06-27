import { svgToBase64 } from '../utils/string';

export const getHighlightedWalletItemBackgroundUri = ({ mode, hover }: { mode: 'light' | 'dark'; hover: boolean }) => {
  const hoverOffset = mode === 'dark' ? 2 : 1.2;
  const gradientOpacity = (mode === 'dark' ? 0.08 : 0.28) * (hover ? hoverOffset : 1);
  const pathOpacity = (mode === 'dark' ? 0.2 : 0.4) * (hover ? hoverOffset : 1);
  const smallPathOpacity = (mode === 'dark' ? 0.1 : 0.2) * (hover ? hoverOffset : 1);

  return svgToBase64(
    `<svg width="380" height="68" viewBox="0 0 380 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#a)">
        <mask id="b" maskUnits="userSpaceOnUse" x="0" y="0" width="380" height="68">
          <path d="M380 0H0v68h380z" fill="#fff" />
        </mask>
        <g mask="url(#b)">
          <path d="M380 0H0v68h380z" fill="#CDD5E5" fill-opacity=".07" />
          <path d="M380 0H0v68h380z" fill="url(#c)" fill-opacity="${gradientOpacity}" />
          <path opacity="${pathOpacity}" d="m310.155 62.633 4.258-.712.022-.004.021-.007 3.1-1.114a12.25 12.25 0 0 0 7.71-8.428l1.071-4.093.003-.014.002-.013 1.265-8.541 1.264 8.54.002.014.003.014 1.113 4.253a12.25 12.25 0 0 0 7.462 8.335l2.721 1.045.021.008.023.004 3.818.713-3.829.89-.02.004-.018.008-2.976 1.222a12.25 12.25 0 0 0-7.179 8.165l-1.135 4.243-.004.013-.002.014-1.264 8.351-1.265-8.35-.002-.015-.004-.013-1.091-4.079a12.25 12.25 0 0 0-7.438-8.267l-3.346-1.286-.019-.007-.02-.004z" fill="url(#d)" fill-opacity=".3" stroke="url(#e)" stroke-width=".5" />
          <path opacity="${pathOpacity}" d="m274.362-1.973 2.535-.424.023-.004.021-.008.302-.108a12.25 12.25 0 0 0 7.709-8.428l.245-.937.004-.013.002-.014.797-5.384.797 5.384.002.014.004.013.286 1.096a12.25 12.25 0 0 0 7.462 8.336l.102.04.022.008.022.004 2.275.425-2.286.53-.019.005-.019.008-.356.146a12.25 12.25 0 0 0-7.179 8.165l-.31 1.157-.004.013-.002.014L286 13.33l-.797-5.265-.002-.014-.004-.013-.266-.992a12.25 12.25 0 0 0-7.437-8.267l-.548-.211-.019-.007-.02-.004z" fill="url(#f)" fill-opacity=".3" stroke="url(#g)" stroke-width=".5" />
          <path opacity="${pathOpacity}" d="m-20.097 57.806 4.976-.832.022-.004.021-.008 4.267-1.532a12.25 12.25 0 0 0 7.71-8.428l1.415-5.41.003-.014.002-.013 1.46-9.857 1.46 9.857.001.014.004.013 1.457 5.57a12.25 12.25 0 0 0 7.461 8.335l3.814 1.464.021.008.022.004 4.462.833-4.472 1.04-.02.004-.019.007-4.067 1.671a12.25 12.25 0 0 0-7.179 8.164l-1.48 5.53-.004.014-.002.014-1.46 9.638-1.459-9.638-.002-.014-.003-.013-1.436-5.365a12.25 12.25 0 0 0-7.438-8.268l-4.513-1.735-.019-.007-.02-.004z" fill="url(#h)" fill-opacity=".3" stroke="url(#i)" stroke-width=".5" />
          <path opacity="${smallPathOpacity}" d="m362.477 19.027.723-.122-.041-.246.085.235a6.93 6.93 0 0 0 4.358-4.764l.087-.332.003-.013.002-.014.306-2.064.306 2.064.002.014.003.013.137.524a6.72 6.72 0 0 0 4.091 4.57l.09-.233-.046.246.652.121-.663.154.057.244-.095-.231a7.01 7.01 0 0 0-4.111 4.675l-.111.416-.004.013-.002.014-.306 2.02-.306-2.02-.002-.014-.003-.013-.061-.225a7.21 7.21 0 0 0-4.379-4.868l-.09.233.051-.245z" fill="url(#j)" fill-opacity=".3" stroke="url(#k)" stroke-width=".5" />
        </g>
      </g>
      <defs>
        <linearGradient id="c" x1="-111.765" y1="34" x2="414.827" y2="122.719" gradientUnits="userSpaceOnUse">
          <stop offset=".584" stop-color="#0C78FF" />
          <stop offset=".938" stop-color="#2C1C95" />
          <stop offset="1" stop-color="#698DE5" />
        </linearGradient>
        <linearGradient id="d" x1="308.066" y1="82.147" x2="342.785" y2="49.518" gradientUnits="userSpaceOnUse">
          <stop stop-color="#698DE5" />
          <stop offset=".797" stop-color="#9160E1" />
          <stop offset="1" stop-color="#698DE5" />
        </linearGradient>
        <linearGradient id="e" x1="308.066" y1="82.147" x2="342.785" y2="49.518" gradientUnits="userSpaceOnUse">
          <stop stop-color="#698DE5" />
          <stop offset=".797" stop-color="#9160E1" />
          <stop offset="1" stop-color="#698DE5" />
        </linearGradient>
        <linearGradient id="f" x1="272.5" y1="11.5" x2="296.486" y2="-11.042" gradientUnits="userSpaceOnUse">
          <stop stop-color="#698DE5" />
          <stop offset=".797" stop-color="#9160E1" />
          <stop offset="1" stop-color="#698DE5" />
        </linearGradient>
        <linearGradient id="g" x1="272.5" y1="11.5" x2="296.486" y2="-11.042" gradientUnits="userSpaceOnUse">
          <stop stop-color="#698DE5" />
          <stop offset=".797" stop-color="#9160E1" />
          <stop offset="1" stop-color="#698DE5" />
        </linearGradient>
        <linearGradient id="h" x1="-22.281" y1="79.839" x2="16.914" y2="43.004" gradientUnits="userSpaceOnUse">
          <stop stop-color="#698DE5" />
          <stop offset=".797" stop-color="#52D4FF" />
          <stop offset="1" stop-color="#698DE5" />
        </linearGradient>
        <linearGradient id="i" x1="-22.281" y1="79.839" x2="16.914" y2="43.004" gradientUnits="userSpaceOnUse">
          <stop stop-color="#698DE5" />
          <stop offset=".797" stop-color="#5294F8" />
          <stop offset="1" stop-color="#698DE5" />
        </linearGradient>
        <linearGradient id="j" x1="360.853" y1="26.147" x2="373.552" y2="14.213" gradientUnits="userSpaceOnUse">
          <stop stop-color="#698DE5" />
          <stop offset=".797" stop-color="#9160E1" />
          <stop offset="1" stop-color="#698DE5" />
        </linearGradient>
        <linearGradient id="k" x1="360.853" y1="26.147" x2="373.552" y2="14.213" gradientUnits="userSpaceOnUse">
          <stop stop-color="#698DE5" />
          <stop offset=".797" stop-color="#9160E1" />
          <stop offset="1" stop-color="#698DE5" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h380v68H0z" />
        </clipPath>
      </defs>
    </svg>`,
  );
};
