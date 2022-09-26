import { DependencyList, useMemo } from 'react';

import { Comparator } from '../types';
import { useDependencyList } from '../useDependencyList/useDependencyList';

export const useMemoExtended = <T>(
  factory: () => T,
  deps: DependencyList,
  comparator?: Comparator<DependencyList, DependencyList>
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo<T>(factory, useDependencyList(deps, comparator));
};
