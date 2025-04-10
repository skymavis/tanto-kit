import styled from '@emotion/styled';
import { Drawer as DrawerPrimitive } from 'vaul';

const Root = DrawerPrimitive.Root;
const Portal = DrawerPrimitive.Portal;
const Overlay = DrawerPrimitive.Overlay;
const Title = DrawerPrimitive.Title;
const Trigger = DrawerPrimitive.Trigger;
const Close = DrawerPrimitive.Close;

const Content = styled(DrawerPrimitive.Content, {
  shouldForwardProp: propName => propName !== 'isEmbedded',
})({
  position: 'fixed',
  insetX: 0,
  bottom: 0,
  zIndex: 50,
  marginTop: '24px',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  borderRadius: '20px 20px 0 0',
  padding: '16px 20px 20px 20px',
});

export { Close, Content, Overlay, Portal, Root, Title, Trigger };
