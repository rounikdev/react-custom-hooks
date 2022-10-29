import { useRef } from 'react';

import { GlobalModel } from '@services/models';

import { Comparator } from '../types';

export const useUpdateSync = <T>(
  callback: () => void,
  value: T,
  comparator?: boolean | Comparator<T, T>
) => {
  const refDiff = useRef(value);

  if (GlobalModel.hasValueDiff({ comparator, newValue: value, prevValue: refDiff.current })) {
    callback();

    refDiff.current = value;
  }
};
