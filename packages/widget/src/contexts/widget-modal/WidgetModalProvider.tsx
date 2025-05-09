import { PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { WidgetModalContext, WidgetModalState } from './WidgetModalContext';

export const WidgetModalProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  const contextValue = useMemo<WidgetModalState>(
    () => ({
      open,
      setOpen,
      show,
      hide,
    }),
    [open, show, hide],
  );

  return <WidgetModalContext.Provider value={contextValue}>{children}</WidgetModalContext.Provider>;
};
