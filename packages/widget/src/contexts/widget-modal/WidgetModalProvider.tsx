import type { PropsWithChildren } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { WidgetModal } from '../../WidgetModal';
import type { WidgetModalState } from './WidgetModalContext';
import { WidgetModalContext } from './WidgetModalContext';

export function WidgetModalProvider({ children }: PropsWithChildren) {
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

  return (
    <WidgetModalContext.Provider value={contextValue}>
      {children}
      <WidgetModal />
    </WidgetModalContext.Provider>
  );
}
