import { DependencyList, useEffect } from 'react';

import { UpdateCallback } from '../types';

export const useUpdate = (callback: UpdateCallback, dependencyList: DependencyList): void => {
  useEffect(() => {
    const result = callback();

    return () => {
      (async () => {
        const func = await result;

        if (typeof func === 'function') {
          func();
        }
      })();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList);
};
