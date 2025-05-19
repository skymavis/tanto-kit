export function hasOpacity(color: string): boolean {
  color = color.trim().toLowerCase();

  // Match rgba or hsla with alpha < 1
  const alphaFuncRegex = /^(rgba|hsla)\(\s*\d+[\s,]+[\d.]+%?[\s,]+[\d.]+%?[\s,]+(0(\.\d+)?|0?\.\d+)\s*\)$/;

  // Match hex with alpha: #RGBA or #RRGGBBAA
  const hexAlphaRegex = /^#(?:[\da-f]{4}|[\da-f]{8})$/i;

  return alphaFuncRegex.test(color) || hexAlphaRegex.test(color);
}
