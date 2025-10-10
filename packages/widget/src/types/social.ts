import { FC, SVGProps } from 'react';

import { AppleIcon } from '../assets/AppleIcon';
import { FacebookIcon } from '../assets/FacebookIcon';
import { GoogleIcon } from '../assets/GoogleIcon';

export type SocialProvider = 'google' | 'apple' | 'facebook';

export const SOCIAL_PROVIDERS: Record<SocialProvider, { icon: FC<SVGProps<SVGSVGElement>> }> = {
  google: { icon: GoogleIcon },
  apple: { icon: AppleIcon },
  facebook: { icon: FacebookIcon },
} as const;
