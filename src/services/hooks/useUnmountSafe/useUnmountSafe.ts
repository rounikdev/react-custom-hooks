import { useEffectOnce } from '../useEffectOnce/useEffectOnce';

import { CleanupCallback } from '../types';
import { useUpdatedRef } from '../useUpdatedRef/useUpdatedRef';

export const useUnmountSafe = (cleanupCallback: CleanupCallback): void => {
  const updatedCleanupCallback = useUpdatedRef(cleanupCallback);

  useEffectOnce(() => {
    return updatedCleanupCallback.current;
  });
};
