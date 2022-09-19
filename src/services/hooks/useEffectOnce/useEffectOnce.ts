import { useEffect, useRef, useState } from 'react';

import { UpdateCallback } from '../types';

export const useEffectOnce = (callback: UpdateCallback) => {
  const destroyFn = useRef<void | Promise<void> | (() => void)>();
  const effectCalled = useRef(false);
  const rendered = useRef(false);
  const [, setVal] = useState({});

  if (effectCalled.current) {
    rendered.current = true;
  }

  useEffect(() => {
    // Only execute the effect first time around
    // Implements useMount
    if (!effectCalled.current) {
      destroyFn.current = callback();
      effectCalled.current = true;
    }

    // This forces one render after the effect is run
    // Required in order to trigger the destroyFn in useUnmount
    setVal({});

    return () => {
      (async () => {
        // If the comp didn't render since the useEffect was called,
        // we know it's the dummy React cycle
        if (!rendered.current) {
          return;
        }

        // Otherwise this is not a dummy destroy, so call the destroy func
        if (typeof destroyFn.current === 'function') {
          await destroyFn.current();
        }
      })();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
