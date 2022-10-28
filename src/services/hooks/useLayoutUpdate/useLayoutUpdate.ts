import { DependencyList, useLayoutEffect } from 'react';

import { Comparator, UpdateCallback } from '../types';
import { useDependencyList } from '../useDependencyList/useDependencyList';

export const useLayoutUpdate = (
  callback: UpdateCallback,
  dependencyList: DependencyList,
  comparator?: boolean | Comparator<DependencyList, DependencyList>
): void => {
  const dependencies = useDependencyList(dependencyList, comparator);

  useLayoutEffect(() => {
    const result = callback();

    return () => {
      (async () => {
        const func = await result;

        if (typeof func === 'function') {
          await func();
        }
      })();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
