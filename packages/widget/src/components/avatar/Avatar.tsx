import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import BoringAvatarModule from 'boring-avatars';

const BoringAvatar =
  // BoringAvatarModule can be either a function (the component itself)
  // or an object with a `.default` property depending on how the module is imported,
  // especially when using Rollup with 'external' and consuming ESM-only packages.
  // This check ensures compatibility across different bundlers and environments.
  // @ts-expect-error
  typeof BoringAvatarModule === 'function' ? BoringAvatarModule : BoringAvatarModule.default ?? BoringAvatarModule;

export default BoringAvatar;

const COLOR_GROUPS = [
  ['#2065EE', '#FFAEFC'],
  ['#5CFFFF', '#00D4FF'],
  ['#FFC34D', '#E3E8F2'],
  ['#4BFFD4', '#8833FF'],
  ['#2B4DFF', '#0035FF'],
];

const hashCode = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const character = seed.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash &= hash;
  }
  return Math.abs(hash);
};

const getColors = (seed: string): string[] => {
  return COLOR_GROUPS.map((colorGroup, index) => {
    const hash = hashCode(index + seed);
    return colorGroup[hash % colorGroup.length] as string;
  });
};

export type AvatarSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

const AvatarSizeMap: Record<AvatarSize, number> = {
  XXS: 16,
  XS: 20,
  S: 24,
  M: 32,
  L: 48,
  XL: 64,
  XXL: 80,
  XXXL: 160,
};

export interface AvatarProps {
  className?: string;
  seed?: string;
  size?: AvatarSize;
  dotSize?: string;
  showDot?: boolean;
}

const Container = styled.div<{ size: AvatarSize }>(
  {
    display: 'inline-block',
    overflow: 'hidden',
    position: 'relative',
  },
  ({ size }) => ({
    width: AvatarSizeMap[size],
    height: AvatarSizeMap[size],
  }),
);

const DotContainer = styled('div', {
  shouldForwardProp: propName => propName !== 'dotSize',
})<{ dotSize: number }>(
  {
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  ({ dotSize }) => ({
    '& > svg': {
      width: dotSize,
      height: dotSize,
    },
  }),
);

export const Avatar = ({ className, seed, size = 'M', showDot = false }: AvatarProps) => {
  const theme = useTheme();
  const colors = seed ? getColors(seed) : [theme.skeletonColor];
  const dotSize = AvatarSizeMap[size] / 4;

  return (
    <Container className={className} size={size}>
      <BoringAvatar variant="marble" size={AvatarSizeMap[size]} name={seed} colors={colors} />
      {showDot && (
        <DotContainer dotSize={dotSize}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill={theme.modalBackground} />
            <circle opacity="0.3" cx="10.1429" cy="10.0003" r="8.00028" fill={theme.successColor} />
            <circle cx="10.1428" cy="10.0007" r="6.40022" fill={theme.successColor} />
          </svg>
        </DotContainer>
      )}
    </Container>
  );
};
