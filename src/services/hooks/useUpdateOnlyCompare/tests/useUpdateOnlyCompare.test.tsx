import { DependencyList, FC } from 'react';

import { testRender } from '@services/utils';

import { Comparator } from '../../types';
import { useUpdateOnlyCompare } from '../useUpdateOnlyCompare';

describe('useUpdateOnlyCompare', () => {
  it("Doesn't run on mount", () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      useUpdateOnlyCompare(callback, [callback], true);

      return <div>{otherProp}</div>;
    };

    const callback = jest.fn();

    testRender(<TestComponent callback={callback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('Runs the callback when dependency changes', () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      useUpdateOnlyCompare(callback, [callback], true);

      return <div>{otherProp}</div>;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    const updatedCallback = jest.fn();

    rerender(<TestComponent callback={updatedCallback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(0);
    expect(updatedCallback).toHaveBeenCalledTimes(1);
  });

  it("Doesn't run the callback if other prop changes", () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      useUpdateOnlyCompare(callback, [callback], true);

      return <div>{otherProp}</div>;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    rerender(<TestComponent callback={callback} otherProp="valueB" />);

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('Calls `callback` return function', () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      useUpdateOnlyCompare(callback, [otherProp], true);

      return <div>{otherProp}</div>;
    };

    const callbackReturn = jest.fn();
    const callback = jest.fn(() => callbackReturn);

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(0);
    expect(callbackReturn).toHaveBeenCalledTimes(0);

    rerender(<TestComponent callback={callback} otherProp="valueB" />);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('With `comparator` function', async () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      const comparator: Comparator<DependencyList, DependencyList> = ({ newValue, prevValue }) => {
        return newValue[0] !== prevValue[0];
      };

      useUpdateOnlyCompare(callback, [otherProp], comparator);

      return <div>{otherProp}</div>;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(0);

    rerender(<TestComponent callback={callback} otherProp="valueB" />);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Without `comparator`', async () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      useUpdateOnlyCompare(callback, [otherProp]);

      return <div>{otherProp}</div>;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(0);

    rerender(<TestComponent callback={callback} otherProp="valueB" />);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
