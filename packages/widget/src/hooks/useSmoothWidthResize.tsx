import { composeRefs } from '@radix-ui/react-compose-refs';
import type { HTMLAttributes } from 'react';
import { forwardRef, memo, useMemo, useRef } from 'react';
import { useCallbackRef } from 'use-callback-ref';
import useResizeObserver from 'use-resize-observer';

type ResizableContainerProps = HTMLAttributes<HTMLDivElement>;

export function useSmoothWidthResize() {
  const containerRef = useCallbackRef<HTMLDivElement>(null, container => {
    if (container) container.style.width = `${container.clientWidth}px`;
  });

  const contentRef = useRef<HTMLDivElement>(null);

  useResizeObserver({
    ref: contentRef,
    onResize: ({ width: newWidth }) => {
      const container = containerRef.current;
      if (!container) return;
      if (typeof newWidth !== 'undefined') container.style.width = `${newWidth}px`;
    },
  });

  const ResizableContainer = useMemo(() => {
    const Container = forwardRef<HTMLDivElement, ResizableContainerProps>(({ children, ...rest }, forwardedRef) => (
      <div
        ref={containerRef}
        css={{
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          transition: 'width 0.2s',
        }}
        {...rest}
      >
        <div css={{ width: 'fit-content', whiteSpace: 'nowrap' }} ref={composeRefs(contentRef, forwardedRef)}>
          {children}
        </div>
      </div>
    ));
    return memo(Container);
  }, [containerRef]);

  return { ResizableContainer };
}
