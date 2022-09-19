import { DependencyList, useEffect, useRef } from 'react';
import { dequal } from 'dequal';

import { Comparator, UpdateCallback } from '../types';

export const useUpdateOnlyCompare = (
  callback: UpdateCallback,
  dependencyList: DependencyList,
  comparator?: boolean | Comparator<DependencyList, DependencyList>
): void => {
  const prevDependencyListRef = useRef(dependencyList);

  useEffect(() => {
    let hasChange: boolean;

    if (typeof comparator === 'function') {
      hasChange = comparator({
        newValue: dependencyList,
        prevValue: prevDependencyListRef.current
      });
    } else if (comparator) {
      hasChange = !dequal(prevDependencyListRef.current, dependencyList);
    } else {
      hasChange = dependencyList.some(
        (dep, depIndex) => dep !== prevDependencyListRef.current[depIndex]
      );
    }

    if (!hasChange) {
      return;
    }

    prevDependencyListRef.current = dependencyList;

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
