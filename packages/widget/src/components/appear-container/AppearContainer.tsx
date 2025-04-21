import { AnimatePresence, AnimationProps } from 'motion/react';
import * as m from 'motion/react-m';
import { ReactNode } from 'react';

type AppearContainerProps = AnimationProps & {
  children: ReactNode;
  show: boolean;
};

const defaultProps: AnimationProps = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
  transition: { duration: 0.2 },
};

export function AppearContainer({ children, initial, animate, exit, transition, show }: AppearContainerProps) {
  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={initial || defaultProps.initial}
          animate={animate || defaultProps.animate}
          exit={exit || defaultProps.exit}
          transition={transition || defaultProps.transition}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
}
