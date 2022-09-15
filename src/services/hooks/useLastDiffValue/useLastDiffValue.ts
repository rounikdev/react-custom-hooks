import { useRef } from 'react';

export const useLastDiffValue = <T>(
  value: T,
  comparator?: ({ newValue, prevValue }: { newValue: T; prevValue: T }) => boolean
): T | undefined => {
  const valueList = useRef<T[]>([]);

  valueList.current.unshift(value);

  return valueList.current.find((listValue) => {
    return comparator ? comparator({ newValue: value, prevValue: listValue }) : listValue !== value;
  });
};
