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
        transition: 'width 150ms',
        width: width ? width : 'auto',
      }}
      {...rest}
    >
      <div style={{ width: 'fit-content', whiteSpace: 'nowrap' }} ref={ref}>
        {children}
      </div>
    </div>
  );
};
