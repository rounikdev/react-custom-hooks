import { useRef } from 'react';

export const useIsNotRendered = ({ callback }: { callback: () => void }) => {
  const isRenderedRef = useRef(false);

  if (!isRenderedRef.current) {
    callback();

    isRenderedRef.current = true;
  }
};
