import styled from '@emotion/styled';
import { Drawer as DrawerPrimitive } from 'vaul';

const Root = DrawerPrimitive.Root;
const Portal = DrawerPrimitive.Portal;
const Overlay = DrawerPrimitive.Overlay;
const Title = DrawerPrimitive.Title;
const Trigger = DrawerPrimitive.Trigger;
const Close = DrawerPrimitive.Close;
const Description = DrawerPrimitive.Description;

const Content = styled(DrawerPrimitive.Content)(({ theme }) => ({
  position: 'fixed',
  insetX: 0,
  bottom: 0,
  zIndex: 50,
  marginTop: '24px',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  borderRadius: theme.drawerBorderRadius,
  padding: '16px 20px 40px 20px',
}));

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger };
