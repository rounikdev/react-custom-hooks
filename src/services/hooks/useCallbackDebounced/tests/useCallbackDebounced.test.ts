import { renderHook } from '@testing-library/react';

import { useCallbackDebounced } from '../useCallbackDebounced';

jest.useRealTimers();

describe('useCallbackDebounced', () => {
  const TIMEOUT = 200;

  it('Debounces the execution of the newly returned function', async () => {
    jest.useFakeTimers();

    const mockCallback = jest.fn(() => Promise.resolve());

    const { result } = renderHook(() =>
      useCallbackDebounced({ fn: mockCallback, timeout: TIMEOUT })
    );

    result.current();
    result.current();
    result.current();
    result.current();

    jest.advanceTimersByTime(TIMEOUT);
    expect(mockCallback).toBeCalledTimes(1);
  });
});
