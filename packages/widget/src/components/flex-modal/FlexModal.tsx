import { useTheme } from '@emotion/react';
import type {
  DialogCloseProps,
  DialogDescriptionProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { createContext, ElementRef, forwardRef, ReactNode, useContext, useMemo } from 'react';

import { useIsMobileView } from '../../hooks/useIsMobileView';
import { fadeIn, fadeOut } from '../../styles/animations';
import * as Dialog from './Dialog';
import * as Drawer from './Drawer';

interface FlexModalContextValue {
  isMobile: boolean;
}

export const FlexModalContext = createContext<FlexModalContextValue | null>(null);

function useFlexModalContext() {
  const context = useContext(FlexModalContext);
  if (!context) {
    throw new Error('FlexModal components cannot be rendered outside the FlexModal Context');
  }
  return context;
}

const Root = ({ children, ...props }: DialogProps) => {
  const { isMobile } = useFlexModalContext();
  const RootComponent = isMobile ? Drawer.Root : Dialog.Root;
  return (
    <RootComponent {...props} {...(isMobile && { autoFocus: true })}>
      {children}
    </RootComponent>
  );
};

const Portal = (props: DialogPortalProps) => {
  const { isMobile } = useFlexModalContext();
  const PortalComponent = isMobile ? Drawer.Portal : Dialog.Portal;
  return <PortalComponent {...props} />;
};

const Description = (props: DialogDescriptionProps) => {
  const { isMobile } = useFlexModalContext();
  const DescriptionComponent = isMobile ? Drawer.Description : Dialog.Description;
  return <DescriptionComponent {...props} />;
};

const Overlay = forwardRef<ElementRef<typeof Dialog.Overlay>, Dialog.DialogOverlayProps>((props, ref) => {
  const theme = useTheme();
  const { isMobile } = useFlexModalContext();
  const OverlayComponent = isMobile ? Drawer.Overlay : Dialog.Overlay;
  return (
    <OverlayComponent
      ref={ref}
      css={{
        position: 'fixed',
        inset: 0,
        zIndex: 49,
        backgroundColor: theme.modalOverlayColor,
        '&[data-state="open"]': {
          animation: `${fadeIn} 150ms ease-out`,
        },
        '&[data-state="closed"]': {
          animation: `${fadeOut} 150ms ease-out`,
        },
      }}
      {...props}
    />
  );
});
Overlay.displayName = Dialog.Overlay.displayName;

const Content = forwardRef<ElementRef<typeof Dialog.Content>, Dialog.DialogContentProps>((props, ref) => {
  const { isMobile } = useFlexModalContext();
  const ContentComponent = isMobile ? Drawer.Content : Dialog.Content;
  const theme = useTheme();
  return <ContentComponent ref={ref} css={{ backgroundColor: theme.modalBackgroundColor }} {...props} />;
});
Content.displayName = Dialog.Content.displayName;

const Title = (props: DialogTitleProps) => {
  const { isMobile } = useFlexModalContext();
  const TitleComponent = isMobile ? Drawer.Title : Dialog.Title;
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
};

const Trigger = (props: DialogTriggerProps) => {
  const { isMobile } = useFlexModalContext();
  const TriggerComponent = isMobile ? Drawer.Trigger : Dialog.Trigger;
  return <TriggerComponent {...props} />;
};

const Close = (props: DialogCloseProps) => {
  const { isMobile } = useFlexModalContext();
  const CloseComponent = isMobile ? Drawer.Close : Dialog.Close;
  return <CloseComponent {...props} />;
};

export interface FlexModalProps {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const FlexModal = (props: FlexModalProps) => {
  const { children, defaultOpen, open, onOpenChange } = props;
  const isMobile = useIsMobileView();

  const contextValue = useMemo(
    () => ({
      isMobile,
    }),
    [isMobile],
  );

  return (
    <FlexModalContext.Provider value={contextValue}>
      <Root modal defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
        <Portal>
          <Overlay />
          <Content forceMount>
            <VisuallyHidden>
              <Title />
            </VisuallyHidden>
            <VisuallyHidden>
              <Description />
            </VisuallyHidden>
            {children}
          </Content>
        </Portal>
      </Root>
    </FlexModalContext.Provider>
  );
};

export { Close, Content, Overlay, Portal, Root, Title, Trigger };
