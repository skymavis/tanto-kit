import styled from '@emotion/styled';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ElementRef, forwardRef } from 'react';

import { fadeInUp, fadeOutDown } from '../../styles/animations';

export type DialogContentProps = DialogPrimitive.DialogContentProps & {
  isEmbedded?: boolean;
};
export type DialogOverlayProps = DialogPrimitive.DialogOverlayProps;

const DialogContainer = styled.div<{ isEmbedded?: boolean }>(
  {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ({ isEmbedded }) =>
    !isEmbedded && {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
    },
);

const DialogContent = styled(DialogPrimitive.Content, {
  shouldForwardProp: propName => propName !== 'isEmbedded',
})<{ isEmbedded?: boolean }>(
  {
    display: 'grid',
    width: '100%',
    maxWidth: 420,
    gap: '1rem',
    padding: '8px 20px 20px 20px',
    animationDuration: '150ms',

    '&[data-state="open"]': {
      animation: `${fadeInUp} 0.15s ease-in`,
    },
    '&[data-state="closed"]': {
      animation: `${fadeOutDown} 0.15s ease-out`,
    },
  },
  ({ theme, isEmbedded }) =>
    !isEmbedded && {
      borderRadius: `${theme.modalBorderRadius}px`,
      border: theme.modalBorder,
    },
);

const Root = DialogPrimitive.Root;
const Portal = DialogPrimitive.Portal;
const Overlay = DialogPrimitive.Overlay;
const Title = DialogPrimitive.Title;
const Trigger = DialogPrimitive.Trigger;
const Close = DialogPrimitive.Close;

const Content = forwardRef<ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ children, isEmbedded, ...props }, ref) => {
    return (
      <DialogContainer isEmbedded={isEmbedded}>
        <DialogContent ref={ref} isEmbedded={isEmbedded} {...props}>
          {children}
        </DialogContent>
      </DialogContainer>
    );
  },
);
Content.displayName = DialogPrimitive.Content.displayName;

export { Close, Content, Overlay, Portal, Root, Title, Trigger };
