import { type HTMLAttributes, useCallback, useRef } from 'react';
import useResizeObserver, { ResizeHandler } from 'use-resize-observer';

import { TRANSITION_DURATION } from '../../constants';

export function SmoothHeight({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const onResize = useCallback<ResizeHandler>(({ height }) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    if (height !== undefined) container.style.height = `${height}px`;
  }, []);

  const { ref } = useResizeObserver({ onResize });

  return (
    <div
      ref={containerRef}
      css={{
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: `height ${TRANSITION_DURATION}ms`,
        willChange: 'height',
        contain: 'layout style',
      }}
      {...rest}
    >
      <div css={{ contain: 'layout' }} ref={ref}>
        {children}
      </div>
    </div>
  );
}
