import styled from '@emotion/styled';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';

import { QRCode } from './QRCode';
import { QRCodePlaceholder } from './QRCodePlaceholder';

interface WCQRCodeProps {
  value?: string;
}

const SIZE = 236;
const TRANSITION = { duration: 0.4 };

const Container = styled.div({
  position: 'relative',
  overflow: 'hidden',
  width: SIZE,
  height: SIZE,
});

export const WCQRCode = ({ value }: WCQRCodeProps) => {
  return (
    <Container>
      <AnimatePresence initial={false} mode="popLayout">
        {value ? (
          <m.div
            key={`qr-${value}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITION}
          >
            <QRCode value={value} />
          </m.div>
        ) : (
          <m.div
            key="placeholder"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITION}
          >
            <QRCodePlaceholder />
          </m.div>
        )}
      </AnimatePresence>
    </Container>
  );
};
