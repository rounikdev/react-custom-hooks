import { DependencyList, useEffect, useRef } from 'react';

import { UpdateCallback } from '../types';

export const useUpdateOnlySafe = (
  callback: UpdateCallback,
  dependencyList: DependencyList
): void => {
  const prevDependencyListRef = useRef(dependencyList);

  useEffect(() => {
    const hasChange = dependencyList.some(
      (dep, depIndex) => dep !== prevDependencyListRef.current[depIndex]
    );

    if (!hasChange) {
      return;
    }

    prevDependencyListRef.current = dependencyList;

    const result = callback();

    return () => {
      (async () => {
        const func = await result;

        if (typeof func === 'function') {
          console.log('HERE');
          func();
        }
      })();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList);
};
