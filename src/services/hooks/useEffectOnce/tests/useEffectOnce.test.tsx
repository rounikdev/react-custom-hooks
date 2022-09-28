import { FC } from 'react';

import { testRender } from '@services/utils';

import { useEffectOnce } from '../useEffectOnce';

describe('useEffectOnce', () => {
  it('Executes callback function only once despite multiple renderers', () => {
    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      useEffectOnce(callback);

      return null;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} />);

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={callback} />);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Executes callback return function', async () => {
    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      useEffectOnce(callback);

      return null;
    };

    const callbackReturn = jest.fn();
    const callback = jest.fn(() => callbackReturn);

    const { rerender, unmount } = testRender(<TestComponent callback={callback} />);

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={callback} />);

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();

    await Promise.resolve();

    expect(callbackReturn).toHaveBeenCalledTimes(1);
  });
});
