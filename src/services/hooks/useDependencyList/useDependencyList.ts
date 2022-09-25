import { DependencyList, useMemo, useRef } from 'react';

import { GlobalModel } from '@services/models';

import { Comparator } from '../types';

export const useDependencyList = (
  dependencyList: DependencyList,
  comparator?: boolean | Comparator<DependencyList, DependencyList>
) => {
  const currentDependencyListRef = useRef(dependencyList);
  const updateRef = useRef({});

  if (
    GlobalModel.hasDependencyListDiff({
      comparator,
      prevValue: currentDependencyListRef.current,
      value: dependencyList
    })
  ) {
    currentDependencyListRef.current = dependencyList;
    updateRef.current = {};
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => currentDependencyListRef.current, [updateRef.current]);
};
