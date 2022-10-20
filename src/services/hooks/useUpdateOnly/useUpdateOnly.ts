import { DependencyList, useEffect, useRef } from 'react';

import { Comparator, UpdateCallback } from '../types';
import { useDependencyList } from '../useDependencyList/useDependencyList';

export const useUpdateOnly = (
  callback: UpdateCallback,
  dependencyList: DependencyList,
  comparator?: boolean | Comparator<DependencyList, DependencyList>
): void => {
  const initialDependencyListRef = useRef(dependencyList);
  const dependencies = useDependencyList(dependencyList, comparator);

  useEffect(() => {
    if (initialDependencyListRef.current === dependencies) {
      return;
    }

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
