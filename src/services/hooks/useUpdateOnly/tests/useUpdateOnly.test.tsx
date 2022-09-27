import { FC } from 'react';

import { testRender } from '@services/utils';

import { useUpdateOnly } from '../useUpdateOnly';

describe('useUpdateOnly', () => {
  it("Doesn't run on mount", () => {
    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      useUpdateOnly(callback, [callback]);

      return null;
    };

    const callback = jest.fn();

    testRender(<TestComponent callback={callback} />);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('Runs the callback when dependency changes', () => {
    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      useUpdateOnly(callback, [callback]);

      return null;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} />);

    const updatedCallback = jest.fn();

    rerender(<TestComponent callback={updatedCallback} />);

    expect(callback).toHaveBeenCalledTimes(0);
    expect(updatedCallback).toHaveBeenCalledTimes(1);
  });

  it("Doesn't run the callback if other prop changes", () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({ callback }) => {
      useUpdateOnly(callback, [callback]);

      return null;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    rerender(<TestComponent callback={callback} otherProp="valueB" />);

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it.only('Calls `callback` return function', async () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      useUpdateOnly(callback, [callback, otherProp]);

      return null;
    };

    const callbackReturn = jest.fn();
    const callback = jest.fn(() => Promise.resolve(callbackReturn));

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(0);

    rerender(<TestComponent callback={callback} otherProp="valueB" />);

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={callback} otherProp="valueC" />);

    expect(callback).toHaveBeenCalledTimes(2);

    await Promise.resolve();
    expect(callbackReturn).toHaveBeenCalledTimes(1);
  });
});
