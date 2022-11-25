import { DependencyList, useRef } from 'react';

import { GlobalModel, RAFIdInfo } from '@services/models';

import { Comparator } from '../types';
import { useCallbackExtended } from '../useCallbackExtended/useCallbackExtended';

interface UseCallbackDebouncedPromisifiedArgs<A extends unknown[], R> {
  comparator?: boolean | Comparator<DependencyList, DependencyList>;
  fn: (...args: A) => Promise<R>;
  fnDeps?: DependencyList;
  timeout: number;
}

export const useCallbackDebouncedPromisified = <A extends unknown[], R>({
  fn,
  comparator,
  fnDeps = [],
  timeout
}: UseCallbackDebouncedPromisifiedArgs<A, R>) => {
  const rafIdInfoRef = useRef<RAFIdInfo | null>(null);

  const fnDebounce = useCallbackExtended(
    (...args: A) => {
      return new Promise((resolve: (value: R) => void, reject) => {
        if (rafIdInfoRef.current) {
          GlobalModel.clearRAFTimeout(rafIdInfoRef.current);
        }

        rafIdInfoRef.current = GlobalModel.setRAFTimeout(async () => {
          try {
            resolve(await fn(...args));
          } catch (error) {
            reject(error);
          }
        }, timeout);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fnDeps,
    comparator
  );

  return fnDebounce;
};
