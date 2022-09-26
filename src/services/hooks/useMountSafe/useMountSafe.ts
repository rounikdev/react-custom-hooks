import { MountCallback } from '../types';
import { useEffectOnce } from '../useEffectOnce/useEffectOnce';

export const useMountSafe = (callback: MountCallback) => {
  useEffectOnce(callback);
};
