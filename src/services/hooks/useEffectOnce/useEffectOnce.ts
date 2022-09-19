import { useEffect, useRef, useState } from 'react';

import { UpdateCallback } from '../types';

export const useEffectOnce = (callback: UpdateCallback) => {
  const cleanupCallback = useRef<void | Promise<void> | (() => void)>();
  const isEffectCalled = useRef(false);
  const isRendered = useRef(false);
  const [, forceUpdate] = useState({});

  if (isEffectCalled.current) {
    isRendered.current = true;
  }

  useEffect(() => {
    // Only execute the effect first time around
    // Implements useMount
    if (!isEffectCalled.current) {
      cleanupCallback.current = callback();
      isEffectCalled.current = true;
    }

    // This forces one render after the effect is run
    // Required in order to trigger the cleanupCallback in useUnmount
    forceUpdate({});

    return () => {
      (async () => {
        // If the comp didn't render since the useEffect was called,
        // we know it's the dummy React cycle
        if (!isRendered.current) {
          return;
        }

        // Otherwise this is not a dummy destroy, so call the destroy func
        if (typeof cleanupCallback.current === 'function') {
          await cleanupCallback.current();
        }
      })();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
