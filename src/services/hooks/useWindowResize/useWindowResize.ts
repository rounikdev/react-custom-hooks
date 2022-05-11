import { useRef } from 'react';

import { GlobalModel } from '@services/models';

import { useMount } from '../useMount/useMount';
import { useUnmount } from '../useUnmount/useUnmount';

type ResizeListener = (this: Window, ev: UIEvent) => void;

export const useWindowResize = ({
  callback,
  debounceTime
}: {
  callback: ResizeObserverCallback;
  debounceTime: number; // milliseconds
}) => {
  const onWindowResizeRef = useRef<ResizeListener>();

  useMount(() => {
    onWindowResizeRef.current = GlobalModel.debounceRAF(callback, debounceTime);

    window.addEventListener('resize', onWindowResizeRef.current);
  });

  // Remove listener
  useUnmount(() => {
    onWindowResizeRef.current && window.removeEventListener('resize', onWindowResizeRef.current);
  });
};
