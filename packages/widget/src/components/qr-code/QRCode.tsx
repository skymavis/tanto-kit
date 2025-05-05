import QRCodeStyling, { Options } from 'qr-code-styling';
import { memo, useEffect, useRef } from 'react';

import { blueFilledWCLogoUri } from '../../assets/data-uris';

interface QRCode {
  value: string;
  size?: number;
  logo?: string;
}

const SIZE = 236;
const DEFAULT_OPTIONS: Options = {
  type: 'svg',
  dotsOptions: {
    type: 'dots',
    gradient: {
      type: 'radial',
      colorStops: [
        { offset: 0.0, color: '#0c6fff' },
        { offset: 0.12, color: '#105fff' },
        { offset: 0.25, color: '#104aff' },
        { offset: 0.4, color: '#0e3fff' },
        { offset: 0.55, color: '#1325c2' },
        { offset: 0.7, color: '#1a2fb3' },
        { offset: 0.85, color: '#1f3a88' },
        { offset: 0.98, color: '#1b1d5a' },
        { offset: 1.0, color: '#201f1d' },
      ],
    },
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
    color: '#201f1d',
  },
  cornersDotOptions: {
    type: 'dot',
    color: '#201f1d',
  },
  backgroundOptions: {
    color: '#F1F3F9',
  },
  imageOptions: {
    margin: 3,
    imageSize: 0.18,
  },
  qrOptions: {
    errorCorrectionLevel: 'H',
  },
};

export const QRCode = memo(({ value, size = SIZE, logo = blueFilledWCLogoUri }: QRCode) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrRef.current) return;

    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: size,
        height: size,
        data: value,
        image: logo,
        ...DEFAULT_OPTIONS,
      });
      qrCodeRef.current.append(qrRef.current);
    } else {
      qrCodeRef.current.update({
        width: size,
        height: size,
        data: value,
        image: logo,
      });
    }

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
      qrCodeRef.current = null;
    };
  }, [value, size, logo]);

  return (
    <div
      ref={qrRef}
      css={{
        width: size,
        height: size,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    />
  );
});
