import { useRef } from 'react';

export const useBeforeFirstRender = (callback: () => void) => {
  const isRenderedRef = useRef(false);

  if (!isRenderedRef.current) {
    callback();

    isRenderedRef.current = true;
  }
};
