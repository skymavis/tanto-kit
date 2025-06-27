import styled from '@emotion/styled';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';

import { SIZE, TRANSITION_DURATION } from './constants';
import { QRCode } from './QRCode';
import { QRCodePlaceholder } from './QRCodePlaceholder';

interface AnimatedQRCodeProps {
  value?: string;
}

const Container = styled.div({
  position: 'relative',
  overflow: 'hidden',
  width: SIZE,
  height: SIZE,
});

export function AnimatedQRCode({ value }: AnimatedQRCodeProps) {
  return (
    <Container>
      <AnimatePresence initial={false} mode="popLayout">
        {value ? (
          <m.div
            key={`qr-${value}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION }}
          >
            <QRCode value={value} />
          </m.div>
        ) : (
          <m.div
            key="placeholder"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION }}
          >
            <QRCodePlaceholder />
          </m.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
