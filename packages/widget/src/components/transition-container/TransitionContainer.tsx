import { AnimatePresence, AnimationDefinition, AnimationProps } from 'motion/react';
import * as m from 'motion/react-m';
import type { ReactNode } from 'react';
import { forwardRef, memo } from 'react';

interface TransitionContainerProps {
  children: ReactNode;
  viewKey: string | number;
  onAnimationComplete?: (definition: AnimationDefinition) => void;
}

const animationProps: AnimationProps = {
  initial: { opacity: 0, y: 0, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 4, scale: 0.95 },
  transition: { duration: 0.15 },
};

const TransitionContainerComponent = forwardRef<HTMLDivElement, TransitionContainerProps>(
  ({ children, viewKey, onAnimationComplete }, ref) => (
    <AnimatePresence initial={false} mode="popLayout">
      <m.div
        key={viewKey}
        ref={ref}
        css={{
          width: '100%',
        }}
        {...animationProps}
        onAnimationComplete={onAnimationComplete}
      >
        {children}
      </m.div>
    </AnimatePresence>
  ),
);

TransitionContainerComponent.displayName = 'TransitionContainer';

export const TransitionContainer = memo(TransitionContainerComponent);
