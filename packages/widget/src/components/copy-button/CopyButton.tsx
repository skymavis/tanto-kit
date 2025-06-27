import { useTheme } from '@emotion/react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';

import { CheckCircleFillIcon } from '../../assets/CheckCircleFillIcon';
import { CopyIcon } from '../../assets/CopyIcon';
import { useClipboard } from '../../hooks/useClipboard';
import { Box, BoxProps } from '../box/Box';
import { Button } from '../button/Button';
import { ButtonProps } from '../button/Button.types';

const DEFAULT_ANIMATION_DURATION = 1_500;

type CopyButtonProps = ButtonProps & {
  value?: string;
};

export function CopyButton({ intent = 'secondary', size = 'xsmall', value, children, ...rest }: CopyButtonProps) {
  const theme = useTheme();
  const { copied, handleCopy } = useClipboard(value, DEFAULT_ANIMATION_DURATION);

  const containerStyles: BoxProps = {
    align: 'center',
    gap: children ? 4 : 0,
    mx: children ? 0 : -2,
  };

  return (
    <Button intent={intent} size={size} onClick={handleCopy} disabled={!value} {...rest}>
      <Box {...containerStyles}>
        <AnimatePresence mode="popLayout" initial={false}>
          <m.div
            key={copied.toString()}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: copied ? -180 : 180,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              rotate: copied ? 180 : -180,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: copied ? 20 : 30,
            }}
          >
            {copied ? <CheckCircleFillIcon color={theme.successColor} size={18} /> : <CopyIcon size={18} />}
          </m.div>
        </AnimatePresence>
        {children && <div>{children}</div>}
      </Box>
    </Button>
  );
}
