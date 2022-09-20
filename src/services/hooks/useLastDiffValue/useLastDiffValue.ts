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
  const hasDiffValueRef = useRef(false);

  valueListRef.current.unshift(value);

  console.log('BEFORE valueListRef.current: ', valueListRef.current);

  const diffValue = valueListRef.current.find((listValue) => {
    let hasDiffValue: boolean;

    if (typeof comparator === 'function') {
      hasDiffValue = comparator({ newValue: value, prevValue: listValue });
    } else if (comparator) {
      hasDiffValue = !dequal(listValue, value);
    } else {
      hasDiffValue = listValue !== value;
    }

    if (hasDiffValue) {
      valueListRef.current = [value];
    }

    hasDiffValueRef.current = hasDiffValue;

    return hasDiffValue;
  });

  if (!hasDiffValueRef.current) {
    valueListRef.current = valueListRef.current.length
      ? [valueListRef.current[0]]
      : valueListRef.current;
  }

  console.log('AFTER valueListRef.current: ', valueListRef.current);

  return diffValue;
};
