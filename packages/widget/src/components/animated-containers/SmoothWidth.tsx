import { type HTMLAttributes, useCallback, useRef } from 'react';
import useResizeObserver, { ResizeHandler } from 'use-resize-observer';

import { TRANSITION_DURATION } from '../../constants';

export function SmoothWidth({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const onResize = useCallback<ResizeHandler>(({ width }) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    if (width !== undefined) container.style.width = `${width}px`;
  }, []);

  const { ref } = useResizeObserver({ onResize });
  return (
    <div
      ref={containerRef}
      css={{
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: `width ${TRANSITION_DURATION}ms`,
        willChange: 'width',
        contain: 'layout style',
      }}
      {...rest}
    >
      <div
        css={{
          width: 'fit-content',
          contain: 'layout',
        }}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
