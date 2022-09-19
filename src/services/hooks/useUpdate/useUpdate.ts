import { DependencyList, useEffect } from 'react';

import { UpdateCallback } from '../types';

export const useUpdate = (callback: UpdateCallback, dependencyList: DependencyList): void => {
  useEffect(() => {
    const result = callback();

    return () => {
      (async () => {
        if (typeof result === 'function') {
          await result();
        }
      })();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList);
};
