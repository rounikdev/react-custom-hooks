import { useRef } from 'react';

import { GlobalModel } from '@services/models';

import { Comparator } from '../types';

export const useLastDiffValue = <T>(
  value: T,
  comparator?: boolean | Comparator<T, T>
): T | undefined => {
  const valueListRef = useRef<T[]>([]);

  valueListRef.current.unshift(value);

  const diffValue = valueListRef.current.find((listValue) =>
    GlobalModel.hasValueDiff({ comparator, newValue: value, prevValue: listValue })
  );

  return diffValue;
};
