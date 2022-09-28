import { FC } from 'react';

import { testRender } from '@services/utils';

import { useUnmountSafe } from '../useUnmountSafe';

describe('useUnmountSafe', () => {
  it('Calls the callback once on unmounting the host component', async () => {
    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      useUnmountSafe(callback);

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
