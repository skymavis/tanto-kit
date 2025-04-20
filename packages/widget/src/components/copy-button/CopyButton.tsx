import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useCallback, useState } from 'react';

import { CheckCircleFillIcon } from '../../assets/CheckCircleFillIcon';
import { CopyIcon } from '../../assets/CopyIcon';
import { Box } from '../box/Box';
import { Button } from '../button/Button';
import { ButtonProps } from '../button/Button.types';

type CopyButtonProps = ButtonProps & {
  value?: string;
};

const DEFAULT_ANIMATION_DURATION = 1_500;

export function CopyButton({ intent = 'secondary', size = 'xsmall', value, children, ...rest }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!value || copied) return;
    try {
      await navigator.clipboard.writeText(value.trim());
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, DEFAULT_ANIMATION_DURATION);
    } catch {}
  }, [value, copied]);

  return (
    <Button intent={intent} size={size} disabled={!value} onClick={handleCopy} {...rest}>
      <Box align="center" gap={4}>
        <AnimatePresence mode="popLayout" initial={false}>
          <m.div
            key={copied ? 'check' : 'copy'}
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
            {copied ? <CheckCircleFillIcon color="#52E08D" /> : <CopyIcon />}
          </m.div>
        </AnimatePresence>
        <div>{children}</div>
      </Box>
    </Button>
  );
}
