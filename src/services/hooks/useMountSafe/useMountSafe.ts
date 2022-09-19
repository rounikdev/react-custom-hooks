import { useEffectOnce } from '../useEffectOnce/useEffectOnce';

import { MountCallback } from '../types';

export const useMountSafe = (callback: MountCallback) => {
  useEffectOnce(callback);
};
