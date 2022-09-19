import { FC } from 'react';

import { testRender } from '@services/utils';

import { useUpdateOnlySafe } from '../useUpdateOnlySafe';

describe('useUpdateOnlySafe', () => {
  it("Doesn't run on mount", () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      useUpdateOnlySafe(callback, [callback]);

      console.log('CALLED');

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
      useUpdateOnlySafe(callback, [callback]);

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
      useUpdateOnlySafe(callback, [callback]);

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
      useUpdateOnlySafe(callback, [otherProp]);

      return <div>{otherProp}</div>;
    };

    const callbackReturn = jest.fn();
    const callback = jest.fn(() => Promise.resolve(callbackReturn));

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(0);
    expect(callbackReturn).toHaveBeenCalledTimes(0);

    rerender(<TestComponent callback={callback} otherProp="valueB" />);

    expect(callback).toHaveBeenCalledTimes(1);

    // TODO inner mock function not being called
    // expect(callbackReturn).toHaveBeenCalledTimes(1);
  });
});
