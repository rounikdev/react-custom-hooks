import { MutableRefObject, useRef } from 'react';

import { useUpdateSync } from '../useUpdateSync/useUpdateSync';

export const useUpdatedRef = <T>(value: T): MutableRefObject<T> => {
  const ref = useRef(value);

  useUpdateSync(() => {
    ref.current = value;
  }, value);

  return ref;
};
