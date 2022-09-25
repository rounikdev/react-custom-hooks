import { useRef } from 'react';
import { dequal } from 'dequal';

import { Comparator } from '../types';

// -> 7 [7] => undefined
// -> 5 [5, 7] => 7
// -> 5 [5, 7] => 7

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

  if (typeof diffValue !== 'undefined') {
    valueListRef.current = [value, diffValue];
  }

  return diffValue;
};
