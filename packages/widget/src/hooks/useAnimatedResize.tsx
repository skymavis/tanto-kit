import { composeRefs } from '@radix-ui/react-compose-refs';
import type { HTMLAttributes } from 'react';
import { forwardRef, memo, useMemo, useRef } from 'react';
import { useCallbackRef } from 'use-callback-ref';
import useResizeObserver from 'use-resize-observer';

type ResizableContainerProps = HTMLAttributes<HTMLDivElement>;

export function useAnimatedResize() {
  const containerRef = useCallbackRef<HTMLDivElement>(null, container => {
    if (container) container.style.height = `${container.clientHeight}px`;
  });

  const contentRef = useRef<HTMLDivElement>(null);

  useResizeObserver({
    ref: contentRef,
    onResize: ({ height: newHeight }) => {
      const container = containerRef.current;
      if (!container) return;
      if (typeof newHeight !== 'undefined') container.style.height = `${newHeight}px`;
    },
  });

  const ResizableContainer = useMemo(() => {
    const Container = forwardRef<HTMLDivElement, ResizableContainerProps>(({ children, ...rest }, forwardedRef) => (
      <div
        ref={containerRef}
        css={{
          overflow: 'hidden',
          transition: 'height 0.2s',
        }}
        {...rest}
      >
        <div ref={composeRefs(contentRef, forwardedRef)}>{children}</div>
      </div>
    ));
    return memo(Container);
  }, [containerRef]);

  return { ResizableContainer };
}
