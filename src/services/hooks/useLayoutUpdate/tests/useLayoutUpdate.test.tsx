import { FC } from 'react';

import { testRender } from '@services/utils';

import { useUpdate } from '../../useUpdate/useUpdate';
import { useLayoutUpdate } from '../useLayoutUpdate';

describe('useLayoutUpdate', () => {
  it('Runs before `useUpdate`', async () => {
    const TestComponent: FC<{
      callback: () => void;
      callbackUseEffect: () => void;
      otherProp: string;
    }> = ({ callback, callbackUseEffect, otherProp }) => {
      useLayoutUpdate(callback, [callback, otherProp]);

      useUpdate(callbackUseEffect, [callbackUseEffect, otherProp]);

      return null;
    };

    const callbackReturn = jest.fn();
    const callback = jest.fn(() => callbackReturn);

    const callbackReturnUseEffect = jest.fn();
    const callbackUseEffect = jest.fn(() => callbackReturnUseEffect);

    const { rerender } = testRender(
      <TestComponent callback={callback} callbackUseEffect={callbackUseEffect} otherProp="valueA" />
    );

    expect(callback).toHaveBeenCalledBefore(callbackUseEffect);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callbackUseEffect).toHaveBeenCalledTimes(1);

    rerender(
      <TestComponent callback={callback} callbackUseEffect={callbackUseEffect} otherProp="valueB" />
    );

    await Promise.resolve();

    expect(callbackReturn).toHaveBeenCalledBefore(callbackReturnUseEffect);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callbackUseEffect).toHaveBeenCalledTimes(2);
  });

  it('Runs on mount and when dependency changes', () => {
    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      useLayoutUpdate(callback, [callback]);

      return null;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} />);

    expect(callback).toHaveBeenCalledTimes(1);

    const updatedCallback = jest.fn();

    rerender(<TestComponent callback={updatedCallback} />);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(updatedCallback).toHaveBeenCalledTimes(1);
  });

  it("Doesn't run when other prop changes", () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({ callback }) => {
      useLayoutUpdate(callback, [callback]);

      return null;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={callback} otherProp="valueB" />);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Calls `callback` return function', async () => {
    const TestComponent: FC<{ callback: () => void; otherProp: string }> = ({
      callback,
      otherProp
    }) => {
      useLayoutUpdate(callback, [callback, otherProp]);

      return null;
    };

    const callbackReturn = jest.fn();
    const callback = jest.fn(() => Promise.resolve(callbackReturn));

    const { rerender } = testRender(<TestComponent callback={callback} otherProp="valueA" />);

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={callback} otherProp="valueB" />);

    expect(callback).toHaveBeenCalledTimes(2);

    await Promise.resolve();
    expect(callbackReturn).toHaveBeenCalledTimes(1);
  });

  it('Runs with the default comparator', () => {
    const TestComponent: FC<{ callback: () => void; otherProp: Record<string, number> }> = ({
      callback,
      otherProp
    }) => {
      useLayoutUpdate(callback, [callback, otherProp], true);

      return null;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} otherProp={{ a: 1 }} />);

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={callback} otherProp={{ a: 1 }} />);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Runs with a custom comparator', () => {
    const TestComponent: FC<{ callback: () => void; otherProp: number }> = ({
      callback,
      otherProp
    }) => {
      useLayoutUpdate(callback, [otherProp], ({ newValue }) =>
        newValue.every((dep) => (dep as number) > 0)
      );

      return null;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} otherProp={1} />);

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={callback} otherProp={2} />);

    expect(callback).toHaveBeenCalledTimes(2);

    rerender(<TestComponent callback={callback} otherProp={0} />);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
