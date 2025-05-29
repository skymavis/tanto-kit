import { name, version } from './version';

export function getVersionInfo() {
  return `${name}@${version}`;
}
