import { type HTMLAttributes } from 'react';
import useResizeObserver from 'use-resize-observer';

export const SmoothWidth = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const { width, ref } = useResizeObserver();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: 'width 0.2s',
        width: width ? `${width}px` : 'auto',
      }}
      {...rest}
    >
      <div style={{ width: 'fit-content', whiteSpace: 'nowrap' }} ref={ref}>
        {children}
      </div>
    </div>
  );
};
