import { renderHook } from '@testing-library/react';

import { useCallbackDebouncedPromisified } from '../useCallbackDebouncedPromisified';

jest.useRealTimers();

describe('useCallbackDebouncedPromisified', () => {
  const TIMEOUT = 200;

  it('Debounces a function which returns a fulfillable Promise', async () => {
    jest.useFakeTimers();

    const mockCallback = jest.fn(() => Promise.resolve());

    const { result } = renderHook(() =>
      useCallbackDebouncedPromisified({ fn: mockCallback, timeout: TIMEOUT })
    );

    (async () => {
      await result.current();
      await result.current();
      await result.current();
      await result.current();
    })();

    jest.advanceTimersByTime(TIMEOUT);
    expect(mockCallback).toBeCalledTimes(1);
  });

  it('Debounces a function which returns a rejectable Promise', async () => {
    jest.useFakeTimers();

    const mockCallback = jest.fn(() => Promise.reject('error'));

    const { result } = renderHook(() =>
      useCallbackDebouncedPromisified({ fn: mockCallback, timeout: TIMEOUT })
    );

    (async () => {
      await result.current();
      await result.current();
      await result.current();
      await result.current();
    })().catch((error) => {
      expect(mockCallback).toBeCalledTimes(1);
      expect(error).toBe('error');
    });

    jest.advanceTimersByTime(TIMEOUT);
  });
});
