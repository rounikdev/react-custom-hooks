import { DependencyList, useCallback } from 'react';

import { useDependencyList } from '../useDependencyList/useDependencyList';

import { Comparator } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCallbackExtended = <T extends (...args: any[]) => void>(
  callback: T,
  deps: DependencyList,
  comparator?: boolean | Comparator<DependencyList, DependencyList>
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback<T>(callback, useDependencyList(deps, comparator));
};
