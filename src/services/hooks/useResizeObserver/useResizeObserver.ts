import { useEffect, useRef } from 'react';

import { UseResizeObserverConfig } from '../types';

export const useResizeObserver = ({ callback, target }: UseResizeObserverConfig): void => {
  const observerRef = useRef<ResizeObserver>();

  useEffect(() => {
    observerRef.current = new ResizeObserver(callback);
    target.current && observerRef.current.observe(target.current);

    return () => {
      observerRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, target.current]);
};
