import { DependencyList, useRef } from 'react';

import { GlobalModel, RAFIdInfo } from '@services/models';

import { Comparator } from '../types';
import { useCallbackExtended } from '../useCallbackExtended/useCallbackExtended';

interface UseCallbackDebouncedArgs<A extends unknown[], R> {
  comparator?: boolean | Comparator<DependencyList, DependencyList>;
  fn: (...args: A) => R;
  fnDeps?: DependencyList;
  timeout: number;
}

export const useCallbackDebounced = <A extends unknown[], R>({
  fn,
  comparator,
  fnDeps = [],
  timeout
}: UseCallbackDebouncedArgs<A, R>) => {
  const rafIdInfoRef = useRef<RAFIdInfo | null>(null);

  const fnDebounce = useCallbackExtended(
    (...args: A) => {
      if (rafIdInfoRef.current) {
        GlobalModel.clearRAFTimeout(rafIdInfoRef.current);
      }

      rafIdInfoRef.current = GlobalModel.setRAFTimeout(() => {
        fn(...args);
      }, timeout);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fnDeps,
    comparator
  );

  return fnDebounce;
};
