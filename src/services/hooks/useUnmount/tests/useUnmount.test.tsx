import { FC } from 'react';

import { testRender } from '@services/utils';

import { useUnmount } from '../useUnmount';

describe('useUnmount', () => {
  it('Calls the callback once on unmounting the host component', async () => {
    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      useUnmount(callback);

      return null;
    };

    const callback = jest.fn();

    const { unmount } = testRender(<TestComponent callback={callback} />);

    expect(callback).toHaveBeenCalledTimes(0);

    unmount();

    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
