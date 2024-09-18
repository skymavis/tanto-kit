import { DEFAULT_DELAY_TIME } from '../common/constant';
import { EIP6963EventNames, IEIP6963AnnounceProviderEvent, IEIP6963ProviderDetail } from '../types/eip6963';

const injectedProviders: IEIP6963ProviderDetail[] = [];
export const requestProviders = async (delay = DEFAULT_DELAY_TIME): Promise<IEIP6963ProviderDetail[]> => {
  if (typeof window === 'undefined') {
    return [];
  }

  const handlerAnnouncement = (event: IEIP6963AnnounceProviderEvent) => {
    const isAnnounced = injectedProviders.some(detail => detail.info.uuid === event.detail.info.uuid);
    if (!isAnnounced) {
      injectedProviders.push(event.detail);
    }
  };

  window.addEventListener(EIP6963EventNames.AnnounceProvider, handlerAnnouncement);
  window.dispatchEvent(new CustomEvent(EIP6963EventNames.RequestProvider));

  await new Promise(resolve => setTimeout(resolve, delay));
  window.removeEventListener(EIP6963EventNames.AnnounceProvider, handlerAnnouncement);

  return injectedProviders;
};
