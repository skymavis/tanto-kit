import { StyledConvertedSvg } from './ConvertedSvg.styles';
import type { ConvertedSvgProps } from './ConvertedSvg.types';

export function ConvertedSvg(props: ConvertedSvgProps) {
  const { size = 'default', svgString } = props;
  const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

  return <StyledConvertedSvg src={svgDataUrl} size={size} />;
}
