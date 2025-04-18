import type { PropsWithChildren } from 'react';

export type BadgeIntent = 'default' | 'highlight';
export type BadgeProps = PropsWithChildren & {
  intent?: BadgeIntent;
};
