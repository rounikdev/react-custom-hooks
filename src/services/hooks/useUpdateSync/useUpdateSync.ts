import { useRef } from 'react';

export const useUpdateSync = (callback: () => void, value: unknown) => {
  const refDiff = useRef(value);

  if (value !== refDiff.current) {
    callback();

    refDiff.current = value;
  }
};
