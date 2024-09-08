import { EIP6963EventNames, IEIP6963AnnounceProviderEvent, IEIP6963ProviderDetail } from '../types/eip6963';

export const injectedProviderDetails: IEIP6963ProviderDetail[] = [];

export const requestEIP6963Providers = async (delay = 700): Promise<IEIP6963ProviderDetail[]> => {
  if (typeof window === 'undefined') {
    return injectedProviderDetails;
  }
  const handlerAnnouncement = (event: IEIP6963AnnounceProviderEvent) => {
    const isProviderAlreadyAnnounced = injectedProviderDetails.some(({ info }) => info.uuid === event.detail.info.uuid);
    if (isProviderAlreadyAnnounced) {
      return;
    }
    injectedProviderDetails.push(event.detail);
    window.dispatchEvent(new CustomEvent(EIP6963EventNames.UpdateProvider));
  };

  window.addEventListener(EIP6963EventNames.AnnounceProvider, handlerAnnouncement);
  window.dispatchEvent(new CustomEvent(EIP6963EventNames.RequestProvider));

  return new Promise(resolve => {
    setTimeout(() => {
      window.removeEventListener(EIP6963EventNames.AnnounceProvider, handlerAnnouncement); // Clean up the event listener
      resolve(injectedProviderDetails);
    }, delay);
  });
};

export const onProvidersUpdated = (callback: () => void) => {
  if (typeof window === 'undefined') {
    callback();
  }

  window.addEventListener(EIP6963EventNames.UpdateProvider, callback);
  return () => {
    window.removeEventListener(EIP6963EventNames.UpdateProvider, callback);
  };
};
