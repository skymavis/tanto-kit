import { type HTMLAttributes } from 'react';
import useResizeObserver from 'use-resize-observer';

export const SmoothHeight = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const { height, ref } = useResizeObserver();
  return (
    <div
      style={{
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: 'height 0.2s',
        height: height ? `${height}px` : 'auto',
      }}
      {...rest}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
};
