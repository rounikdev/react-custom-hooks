import { dequal } from 'dequal';
import { useRef } from 'react';

import { Comparator } from '../types';

export const useLastDiffValue = <T>(
  value: T,
  comparator?: boolean | Comparator<T, T>
): T | undefined => {
  const valueListRef = useRef<T[]>([]);

  valueListRef.current.unshift(value);

  const diffValue = valueListRef.current.find((listValue) => {
    let hasDiffValue: boolean;

    if (typeof comparator === 'function') {
      hasDiffValue = comparator({ newValue: value, prevValue: listValue });
    } else if (comparator) {
      hasDiffValue = !dequal(listValue, value);
    } else {
      hasDiffValue = listValue !== value;
    }

    return hasDiffValue;
  });

  return diffValue;
};
