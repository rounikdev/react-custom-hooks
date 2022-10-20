import { CleanupCallback } from '../types';
import { useEffectOnce } from '../useEffectOnce/useEffectOnce';
import { useUpdatedRef } from '../useUpdatedRef/useUpdatedRef';

export const useUnmount = (cleanupCallback: CleanupCallback): void => {
  const updatedCleanupCallback = useUpdatedRef(cleanupCallback);

  useEffectOnce(() => {
    return updatedCleanupCallback.current;
  });
};
