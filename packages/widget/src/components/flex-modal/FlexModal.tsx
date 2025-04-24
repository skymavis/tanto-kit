import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type {
  DialogCloseProps,
  DialogDescriptionProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from '@radix-ui/react-dialog';
import * as m from 'motion/react-m';
import { createContext, ElementRef, forwardRef, memo, ReactNode, useContext, useMemo } from 'react';

import { ArrowLeftIcon } from '../../assets/ArrowLeftIcon';
import { XIcon } from '../../assets/XIcon';
import { useIsMobileView } from '../../hooks/useIsMobileView';
import { useSmoothHeightResize } from '../../hooks/useSmoothHeightResize';
import { fadeIn, fadeOut } from '../../styles/animations';
import { Box } from '../box/Box';
import { IconButton } from '../button/Button';
import { CSSResetContainer } from '../css-reset-container/CSSResetContainer';
import * as Dialog from './Dialog';
import * as Drawer from './Drawer';

interface FlexModalContextValue {
  isMobile: boolean;
  isEmbedded: boolean;
}

const FlexModalContext = createContext<FlexModalContextValue | null>(null);

function useFlexModalContext() {
  const context = useContext(FlexModalContext);
  if (!context) {
    throw new Error('FlexModal components cannot be rendered outside the FlexModal Context');
  }
  return context;
}

const Root = memo(({ children, ...props }: DialogProps) => {
  const { isMobile, isEmbedded } = useFlexModalContext();
  const RootComponent = isEmbedded ? Dialog.Root : isMobile ? Drawer.Root : Dialog.Root;
  return (
    <RootComponent {...props} {...(isMobile && { autoFocus: true })}>
      {children}
    </RootComponent>
  );
});

const Portal = memo((props: DialogPortalProps) => {
  const { isMobile, isEmbedded } = useFlexModalContext();
  const PortalComponent = isEmbedded ? Dialog.Portal : isMobile ? Drawer.Portal : Dialog.Portal;
  return <PortalComponent {...props} />;
});

const Description = memo((props: DialogDescriptionProps) => {
  const { isMobile, isEmbedded } = useFlexModalContext();
  const DescriptionComponent = isEmbedded ? Dialog.Description : isMobile ? Drawer.Description : Dialog.Description;
  return <DescriptionComponent {...props} />;
});

const Overlay = memo(
  forwardRef<ElementRef<typeof Dialog.Overlay>, Dialog.DialogOverlayProps>((props, ref) => {
    const theme = useTheme();
    const { isMobile, isEmbedded } = useFlexModalContext();
    const OverlayComponent = isEmbedded ? Dialog.Overlay : isMobile ? Drawer.Overlay : Dialog.Overlay;
    return (
      <OverlayComponent
        ref={ref}
        css={{
          position: 'fixed',
          inset: 0,
          zIndex: 49,
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

const Content = memo(
  forwardRef<ElementRef<typeof Dialog.Content>, Dialog.DialogContentProps>(({ children, ...rest }, ref) => {
    const { isMobile, isEmbedded } = useFlexModalContext();
    const ContentComponent = isEmbedded ? Dialog.Content : isMobile ? Drawer.Content : Dialog.Content;
    const { ResizableContainer } = useSmoothHeightResize();
    const theme = useTheme();
    return (
      <ContentComponent ref={ref} css={{ backgroundColor: theme.modalBackgroundColor }} {...rest}>
        <ResizableContainer>
          <Description />
          <CSSResetContainer>{children}</CSSResetContainer>
        </ResizableContainer>
      </ContentComponent>
    );
  }),
);
Content.displayName = Dialog.Content.displayName;

const Title = memo((props: DialogTitleProps) => {
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

const Trigger = memo((props: DialogTriggerProps) => {
  const { isMobile, isEmbedded } = useFlexModalContext();
  const TriggerComponent = isEmbedded ? Dialog.Trigger : isMobile ? Drawer.Trigger : Dialog.Trigger;
  return <TriggerComponent {...props} />;
});

const Close = memo((props: DialogCloseProps) => {
  const { isMobile, isEmbedded } = useFlexModalContext();
  const CloseComponent = isEmbedded ? Dialog.Close : isMobile ? Drawer.Close : Dialog.Close;
  return <CloseComponent {...props} />;
});

const ActionSecion = styled(m.div)({
  minWidth: 36,
  minHeight: 36,
  width: 36,
  height: 36,
});

export interface FlexModalProps {
  container?: Element | DocumentFragment | null;
  children: ReactNode;
  title?: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  showBackButton?: boolean;
  onOpenChange?: (open: boolean) => void;
  onBack?: () => void;
  onAfterClose?: (event: Event) => void;
}

export const FlexModal = memo((props: FlexModalProps) => {
  const { container, children, title, defaultOpen, open, showBackButton, onOpenChange, onBack, onAfterClose } = props;
  const isMobile = useIsMobileView();
  const isEmbedded = typeof container !== 'undefined' && container !== null;
  const resolvedOpen = isEmbedded ? true : open;
  const allowOutsideInteraction = !isEmbedded;
  const showOverlay = !isEmbedded;
  const showCloseButton = !isEmbedded;

  const contextValue = useMemo(
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
            <Box align="center" gap={4} mb={16}>
              <ActionSecion>
                {showBackButton && (
                  <IconButton
                    aria-label="Back"
                    intent="secondary"
                    variant="plain"
                    size="small"
                    icon={<ArrowLeftIcon />}
                    onClick={onBack}
                  />
                )}
              </ActionSecion>
              <Title>{title}</Title>
              <ActionSecion>
                {showCloseButton && (
                  <Close asChild aria-label="Close">
                    <IconButton intent="secondary" variant="plain" size="small" icon={<XIcon />} />
                  </Close>
                )}
              </ActionSecion>
            </Box>
            {children}
          </Content>
        </Portal>
      </Root>
    </FlexModalContext.Provider>
  );
});

export { Close, Content, Overlay, Portal, Root, Title, Trigger };
