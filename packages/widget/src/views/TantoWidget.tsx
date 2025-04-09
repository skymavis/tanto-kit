import { useContext, useState } from 'react';
import { WagmiContext } from 'wagmi';

import { FlexModal } from '../components/flex-modal/FlexModal';
import { TransitionContainer } from '../components/transition-container/TransitionContainer';
import { ThemeProvider } from '../contexts/ThemeProvider';
import { useNavigation, ViewKeys } from '../stores/useNavigation';
import type { ThemeMode } from '../types/theme';
import { ConnectorList } from './ConnectorList';

export interface TantoWidgetProps {
  theme?: ThemeMode;
  defaultOpen?: boolean;
  open?: boolean;
  container?: HTMLElement | null;
  onOpenChange?: (open: boolean) => void;
}

export function TantoWidget(props: TantoWidgetProps) {
  if (!useContext(WagmiContext)) {
    throw new Error('TantoWidget must be within a WagmiProvider');
  }

  return (
    <ThemeProvider theme={props.theme}>
      <TantoWidgetComponent {...props} />
    </ThemeProvider>
  );
}

function TantoWidgetComponent(props: TantoWidgetProps) {
  const {
    // container,
    defaultOpen,
    open,
    onOpenChange,
  } = props;

  const { view, reset } = useNavigation();

  const views = {
    [ViewKeys.CONNECTORS]: <ConnectorList />,
  };

  const [container, setContainer] = useState<HTMLElement | null>(null);

  return (
    <div>
      <div ref={setContainer} />
      <FlexModal
        container={container}
        title={view.title}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        onAfterClose={reset}
      >
        <TransitionContainer viewKey={view.key}>
          {/* {views[view.key]} */}
          123
        </TransitionContainer>
      </FlexModal>
    </div>
  );
}
