import { DependencyList, useEffect, useRef, useMemo, useCallback } from 'react';
import { dequal } from 'dequal';

import { Comparator, UpdateCallback } from '../types';

interface HasDiff<T> {
  comparator?: boolean | Comparator<T, T>;
  prevValue: T;
  value: T;
}

const hasDiff = ({ comparator, prevValue, value }: HasDiff<DependencyList>) => {
  let hasChange: boolean;

  if (typeof comparator === 'function') {
    hasChange = comparator({
      newValue: value,
      prevValue: prevValue
    });
  } else if (comparator) {
    hasChange = !dequal(prevValue, value);
  } else {
    hasChange = value.some((dep, depIndex) => dep !== prevValue[depIndex]);
  }

  return hasChange;
};

export const useDependencyList = (
  dependencyList: DependencyList,
  comparator?: boolean | Comparator<DependencyList, DependencyList>
) => {
  const currentDependencyListRef = useRef(dependencyList);

  if (hasDiff({ comparator, prevValue: currentDependencyListRef.current, value: dependencyList })) {
    currentDependencyListRef.current = dependencyList;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => currentDependencyListRef.current, [currentDependencyListRef.current]);
};

export const useCallbackExtended = <T extends () => void>(
  callback: T,
  deps: DependencyList,
  comparator?: Comparator<DependencyList, DependencyList>
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback<T>(callback, useDependencyList(deps, comparator));
};

export const useMemoExtended = <T>(
  factory: () => T,
  deps: DependencyList,
  comparator?: Comparator<DependencyList, DependencyList>
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo<T>(factory, useDependencyList(deps, comparator));
};

export const useUpdateExtended = (
  callback: UpdateCallback,
  dependencyList: DependencyList,
  comparator?: boolean | Comparator<DependencyList, DependencyList>
): void => {
  const dependencies = useDependencyList(dependencyList, comparator);

  useEffect(() => {
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
