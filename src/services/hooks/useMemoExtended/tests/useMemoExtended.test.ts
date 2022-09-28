/* eslint-disable testing-library/render-result-naming-convention */
import { renderHook } from '@testing-library/react';

import { useMemoExtended } from '../useMemoExtended';

describe('useMemoExtended', () => {
  it('Returns the same value with empty deps array', async () => {
    const mockValue = 0;

    const { result } = renderHook(() => useMemoExtended(() => mockValue, []));

    expect(result.current === mockValue).toBeTruthy();
  });

  it('Returns a new value based on dependencies change', async () => {
    let mockValue = 0;

    const { rerender, result } = renderHook(
      ({ initialDeps }) => useMemoExtended(() => mockValue, initialDeps),
      {
        initialProps: { initialDeps: [1] }
      }
    );

    expect(result.current).toBe(mockValue);

    mockValue = 1;

    rerender({ initialDeps: [2] });

    expect(result.current).toBe(mockValue);
  });

  // eslint-disable-next-line max-len
  it('Returns the same value when the default comparator is enabled (deep equality)', async () => {
    let mockValue = 0;

    const { rerender, result } = renderHook(
      ({ initialDeps }) => useMemoExtended(() => mockValue, initialDeps, true),
      {
        initialProps: { initialDeps: [{ a: 1 }] }
      }
    );

    expect(result.current).toBe(mockValue);

    mockValue = 1;

    rerender({ initialDeps: [{ a: 1 }] });

    expect(result.current).toBe(0);
  });

  it.only('Returns a new value based on a custom comparator', async () => {
    let mockValue = 0;

    const { rerender, result } = renderHook(
      ({ initialDeps }) =>
        useMemoExtended(
          () => mockValue,
          initialDeps,
          ({ newValue }) => newValue.every((dep) => (dep as number) > 0)
        ),
      {
        initialProps: { initialDeps: [1] }
      }
    );

    expect(result.current).toBe(mockValue);

    mockValue = 1;

    rerender({ initialDeps: [0] });

    expect(result.current).toBe(0);

    rerender({ initialDeps: [2] });

    expect(result.current).toBe(mockValue);
  });
});
