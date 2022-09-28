/* eslint-disable testing-library/render-result-naming-convention */
import { renderHook } from '@testing-library/react';

import { useDependencyList } from '../useDependencyList';

describe('useDependencyList', () => {
  it('Returns the same dependency list with empty deps array', async () => {
    const mockDependencies = [1, 2];

    const { result } = renderHook(() => useDependencyList(mockDependencies));

    expect(result.current === mockDependencies).toBeTruthy();
  });

  it('Returns a new dependency list based on dependencies change', async () => {
    let mockDependencies = [1, 2];

    const { rerender, result } = renderHook(() => useDependencyList(mockDependencies));

    expect(result.current === mockDependencies).toBeTruthy();

    mockDependencies = [3, 4];

    rerender();

    expect(result.current).toBe(mockDependencies);
  });

  // eslint-disable-next-line max-len
  it('Returns the same dependency list when the default comparator is enabled (deep equality)', async () => {
    let mockDependencies = [{ a: 1 }];

    const { rerender, result } = renderHook(() => useDependencyList(mockDependencies, true));

    expect(result.current === mockDependencies).toBeTruthy();

    const prevMockDependencies = mockDependencies;
    mockDependencies = [{ a: 1 }];

    rerender();

    expect(result.current).toBe(prevMockDependencies);
  });

  it('Returns a new dependency list based on a custom comparator', async () => {
    let mockDependencies = [1];

    const { rerender, result } = renderHook(() =>
      useDependencyList(mockDependencies, ({ newValue }) =>
        newValue.every((dep) => (dep as number) > 0)
      )
    );

    expect(result.current === mockDependencies).toBeTruthy();

    mockDependencies = [2];

    rerender();

    expect(result.current).toBe(mockDependencies);

    const prevMockDependencies = mockDependencies;
    mockDependencies = [0];

    rerender();

    expect(result.current).toBe(prevMockDependencies);
  });
});
