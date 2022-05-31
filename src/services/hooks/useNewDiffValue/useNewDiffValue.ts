import { useRef } from 'react';

export const useNewDiffValue = <T>({ callback, value }: { callback: () => void; value: T }) => {
  const refDiff = useRef(value);

  if (value !== refDiff.current) {
    callback();

    refDiff.current = value;
  }
};
