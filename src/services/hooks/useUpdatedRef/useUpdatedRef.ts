import { MutableRefObject, useRef } from 'react';

import { Comparator } from '../types';
import { useUpdateSync } from '../useUpdateSync/useUpdateSync';

export const useUpdatedRef = <T>(
  value: T,
  comparator?: boolean | Comparator<T, T>
): MutableRefObject<T> => {
  const ref = useRef(value);

  useUpdateSync(
    () => {
      ref.current = value;
    },
    value,
    comparator
  );

  return ref;
};
