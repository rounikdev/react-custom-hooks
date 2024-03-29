/* eslint-disable testing-library/render-result-naming-convention */
import { renderHook } from '@testing-library/react';

import { useCallbackExtended } from '../useCallbackExtended';

describe('useCallbackExtended', () => {
  it('Returns the same function with empty deps array', async () => {
    const mockCallback = jest.fn();

    const { result } = renderHook(() => useCallbackExtended(mockCallback, []));

    expect(result.current === mockCallback).toBeTruthy();
  });

  it('Returns a new function based on dependencies change', async () => {
    let callback = () => 10;

    const { rerender, result } = renderHook(
      ({ initialDeps }) => useCallbackExtended(callback, initialDeps),
      {
        initialProps: { initialDeps: [1] }
      }
    );

    expect(result.current()).toBe(10);

    callback = () => 20;

    rerender({ initialDeps: [2] });

    expect(result.current()).toBe(20);
  });

  // eslint-disable-next-line max-len
  it('Returns the same function when the default comparator is enabled (deep equality)', async () => {
    let callback = () => 10;

    const { rerender, result } = renderHook(
      ({ initialDeps }) => useCallbackExtended(callback, initialDeps, true),
      {
        initialProps: { initialDeps: [{ a: 1 }] }
      }
    );

    expect(result.current()).toBe(10);

    callback = () => 20;

    rerender({ initialDeps: [{ a: 1 }] });

    expect(result.current()).toBe(10);
  });

  it('Returns a new function based on a custom comparator', async () => {
    let callback = () => 10;

    const { rerender, result } = renderHook(
      ({ initialDeps }) =>
        useCallbackExtended(callback, initialDeps, ({ newValue }) =>
          newValue.every((dep) => (dep as number) > 0)
        ),
      {
        initialProps: { initialDeps: [1] }
      }
    );

    expect(result.current()).toBe(10);

    callback = () => 20;

    rerender({ initialDeps: [0] });

    expect(result.current()).toBe(10);

    rerender({ initialDeps: [2] });

    expect(result.current()).toBe(20);
  });
});
