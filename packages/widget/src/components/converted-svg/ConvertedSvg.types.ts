export type ConvertedSvgSize = 'small' | 'default' | 'large';
export interface ConvertedSvgProps {
  svgString: string;
  size?: ConvertedSvgSize;
}
