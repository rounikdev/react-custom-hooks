import { MountCallback } from '../types';
import { useEffectOnce } from '../useEffectOnce/useEffectOnce';

export const useMount = (callback: MountCallback) => {
  useEffectOnce(callback);
};
