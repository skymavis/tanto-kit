import { AnimatePresence, domAnimation, LazyMotion } from 'motion/react';
import * as m from 'motion/react-m';
import type { ReactNode } from 'react';
import { forwardRef, memo } from 'react';

interface TransitionContainerProps {
  children: ReactNode;
  viewKey: string | number;
}

const animationProps = {
  initial: { opacity: 0, y: 0, scale: 1 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 4, scale: 0.95 },
  transition: { duration: 0.15 },
};

const TransitionContainerComponent = forwardRef<HTMLDivElement, TransitionContainerProps>(
  ({ children, viewKey }, ref) => (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence initial={false} mode="popLayout">
        <m.div key={viewKey} ref={ref} {...animationProps}>
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  ),
);

TransitionContainerComponent.displayName = 'TransitionContainer';

export const TransitionContainer = memo(TransitionContainerComponent);
