import { useTheme } from '@emotion/react';
import type {
  DialogCloseProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from '@radix-ui/react-dialog';
import * as React from 'react';

import { useAnimatedResize } from '../../hooks/useAnimatedResize';
import { useIsMobile } from '../../hooks/useMobile';
import { fadeIn, fadeOut } from '../../styles/animations';
import { Box } from '../box/Box';
import { IconButton } from '../button/Button';
import { XIcon } from '../icons/XIcon';
import * as Dialog from './Dialog';
import * as Drawer from './Drawer';

interface FlexModalContextValue {
  isMobile: boolean;
  isEmbedded: boolean;
}

const FlexModalContext = React.createContext<FlexModalContextValue | null>(null);

function useFlexModalContext() {
  const context = React.useContext(FlexModalContext);
  if (!context) {
    throw new Error('FlexModal components cannot be rendered outside the FlexModal Context');
  }
  return context;
}

const Root = React.memo(({ children, ...props }: DialogProps) => {
  const { isMobile, isEmbedded } = useFlexModalContext();
  const RootComponent = isEmbedded ? Dialog.Root : isMobile ? Drawer.Root : Dialog.Root;
  return (
    <RootComponent {...props} {...(isMobile && { autoFocus: true })}>
      {children}
    </RootComponent>
  );
});

const Portal = React.memo((props: DialogPortalProps) => {
  const { isMobile, isEmbedded } = useFlexModalContext();
  const PortalComponent = isEmbedded ? Dialog.Portal : isMobile ? Drawer.Portal : Dialog.Portal;
  return <PortalComponent {...props} />;
});

const Overlay = React.memo(
  React.forwardRef<React.ElementRef<typeof Dialog.Overlay>, Dialog.DialogOverlayProps>((props, ref) => {
    const theme = useTheme();
    const { isMobile, isEmbedded } = useFlexModalContext();
    const OverlayComponent = isEmbedded ? Dialog.Overlay : isMobile ? Drawer.Overlay : Dialog.Overlay;
    return (
      <OverlayComponent
        ref={ref}
        css={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          backgroundColor: theme.modalOverlayColor,
          '&[data-state="open"]': {
            animation: `${fadeIn} 0.15s ease-in`,
          },
          '&[data-state="closed"]': {
            animation: `${fadeOut} 0.15s ease-out`,
          },
        }}
        {...props}
      />
    );
  }),
);
Overlay.displayName = Dialog.Overlay.displayName;

const Content = React.memo(
  React.forwardRef<React.ElementRef<typeof Dialog.Content>, Dialog.DialogContentProps>(({ children, ...rest }, ref) => {
    const { isMobile, isEmbedded } = useFlexModalContext();
    const ContentComponent = isEmbedded ? Dialog.Content : isMobile ? Drawer.Content : Dialog.Content;
    const { ResizableContainer } = useAnimatedResize();
    const theme = useTheme();
    return (
      <ContentComponent ref={ref} css={{ backgroundColor: theme.modalBackgroundColor }} {...rest}>
        <ResizableContainer>{children}</ResizableContainer>
      </ContentComponent>
    );
  }),
);
Content.displayName = Dialog.Content.displayName;

const Title = React.memo((props: DialogTitleProps) => {
  const { isMobile, isEmbedded } = useFlexModalContext();
  const TitleComponent = isEmbedded ? Dialog.Title : isMobile ? Drawer.Title : Dialog.Title;
  return (
    <TitleComponent
      css={{
        flex: 1,
        fontSize: 20,
        fontWeight: 500,
        wordBreak: 'break-word',
      }}
      {...props}
    />
  );
});

const Trigger = React.memo((props: DialogTriggerProps) => {
  const { isMobile, isEmbedded } = useFlexModalContext();
  const TriggerComponent = isEmbedded ? Dialog.Trigger : isMobile ? Drawer.Trigger : Dialog.Trigger;
  return <TriggerComponent {...props} />;
});

const Close = React.memo((props: DialogCloseProps) => {
  const { isMobile, isEmbedded } = useFlexModalContext();
  const CloseComponent = isEmbedded ? Dialog.Close : isMobile ? Drawer.Close : Dialog.Close;
  return <CloseComponent {...props} />;
});

export interface FlexModalProps {
  container?: Element | DocumentFragment | null;
  children: React.ReactNode;
  title?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAfterClose?: (event: Event) => void;
}

export const FlexModal = React.memo((props: FlexModalProps) => {
  const { container, children, title, defaultOpen, open, onOpenChange, onAfterClose } = props;
  const isMobile = useIsMobile();
  const isEmbedded = typeof container !== 'undefined' && container !== null;
  const resolvedOpen = isEmbedded ? true : open;
  const allowOutsideInteraction = !isEmbedded;
  const showOverlay = !isEmbedded;
  const showCloseButton = !isEmbedded;

  const contextValue = React.useMemo(
    () => ({
      isMobile,
      isEmbedded,
    }),
    [isMobile, isEmbedded],
  );

  return (
    <FlexModalContext.Provider value={contextValue}>
      <Root defaultOpen={defaultOpen} open={resolvedOpen} modal={allowOutsideInteraction} onOpenChange={onOpenChange}>
        <Portal container={container}>
          {showOverlay && <Overlay />}
          <Content forceMount isEmbedded={isEmbedded} onCloseAutoFocus={onAfterClose}>
            <Box gap={16} mb={16}>
              <Title>{title}</Title>
              {showCloseButton && (
                <Close asChild aria-label="Close">
                  <IconButton intent="secondary" variant="plain" size="small" icon={<XIcon />} />
                </Close>
              )}
            </Box>
            {children}
          </Content>
        </Portal>
      </Root>
    </FlexModalContext.Provider>
  );
});

export { Close, Content, Overlay, Portal, Root, Title, Trigger };
