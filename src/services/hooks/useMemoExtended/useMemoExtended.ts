import { DependencyList, useMemo } from 'react';

import { useDependencyList } from '../useDependencyList/useDependencyList';

import { Comparator } from '../types';

export const useMemoExtended = <T>(
  factory: () => T,
  deps: DependencyList,
  comparator?: Comparator<DependencyList, DependencyList>
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo<T>(factory, useDependencyList(deps, comparator));
};
