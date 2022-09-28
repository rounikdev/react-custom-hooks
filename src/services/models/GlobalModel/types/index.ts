import { Comparator } from '../../../hooks/types';

export type RAFIdInfo = {
  id: number | null;
};

export interface HasDiff<T> {
  comparator?: boolean | Comparator<T, T>;
  newValue: T;
  prevValue: T;
}
