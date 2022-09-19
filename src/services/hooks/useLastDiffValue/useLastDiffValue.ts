import { useRef } from 'react';
import { dequal } from 'dequal';

import { Comparator } from '../types';

export const useLastDiffValue = <T>(
  value: T,
  comparator?: boolean | Comparator<T, T>
): T | undefined => {
  const valueList = useRef<T[]>([]);

  valueList.current.unshift(value);

  return valueList.current.find((listValue) => {
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
};
