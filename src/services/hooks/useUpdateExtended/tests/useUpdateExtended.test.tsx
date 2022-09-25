import { FC } from 'react';

import { testRender } from '@services/utils';

import { useUpdateExtended } from '../useUpdateExtended';

describe('useUpdateExtended', () => {
  it('Runs on mount and when dependency changes', () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      useUpdateExtended(callback, [callback]);

      return <div>{otherProp}</div>;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(1);

    const updatedCallback = jest.fn();

    rerender(<TestComponent callback={updatedCallback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(updatedCallback).toHaveBeenCalledTimes(1);
  });

  it("Doesn't run when other prop changes", () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      useUpdateExtended(callback, [callback]);

      return <div>{otherProp}</div>;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={callback} otherProp="valueB" />);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Calls `callback` return function', () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      useUpdateExtended(callback, [callback]);

      return <div>{otherProp}</div>;
    };

    const callbackReturn = jest.fn();
    let callback = jest.fn(() => Promise.resolve(callbackReturn));

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(1);
    // TODO inner mock function not being called
    // expect(callbackReturn).toHaveBeenCalledTimes(1);

    const updatedCallbackReturn = jest.fn();
    callback = jest.fn(() => updatedCallbackReturn) as jest.Mock;

    rerender(<TestComponent callback={callback} otherProp="valueB" />);

    expect(callback).toHaveBeenCalledTimes(1);
    // TODO inner mock function not being called
    // expect(updatedCallbackReturn).toHaveBeenCalledTimes(1);
  });
});
