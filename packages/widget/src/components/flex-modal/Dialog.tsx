import styled from '@emotion/styled';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ElementRef, forwardRef } from 'react';

import { fadeInUp, fadeOutDown } from '../../styles/animations';

export type DialogContentProps = DialogPrimitive.DialogContentProps;
export type DialogOverlayProps = DialogPrimitive.DialogOverlayProps;

const DialogContainer = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  inset: 0,
  zIndex: 50,
});

const DialogContent = styled(DialogPrimitive.Content)(
  {
    boxSizing: 'border-box',
    outline: 'none',
    display: 'grid',
    minWidth: 420,
    gap: '1rem',
    padding: '8px 20px 20px 20px',
    animationDuration: '150ms',

    '&[data-state="open"]': {
      animation: `${fadeInUp} 150ms ease`,
    },
    '&[data-state="closed"]': {
      animation: `${fadeOutDown} 150ms ease`,
    },
  },
  ({ theme }) => ({
    borderRadius: theme.modalBorderRadius,
    border: theme.modalBorder,
  }),
);

const Root = DialogPrimitive.Root;
const Portal = DialogPrimitive.Portal;
const Overlay = DialogPrimitive.Overlay;
const Title = DialogPrimitive.Title;
const Trigger = DialogPrimitive.Trigger;
const Close = DialogPrimitive.Close;
const Description = DialogPrimitive.Description;

const Content = forwardRef<ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <DialogContainer>
        <DialogContent ref={ref} {...props}>
          {children}
        </DialogContent>
      </DialogContainer>
    );
  },
);
Content.displayName = DialogPrimitive.Content.displayName;

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger };
