import { FC } from 'react';

import { testRender } from '@services/utils';

import { useMountSafe } from '../useMountSafe';

describe('useMountSafe', () => {
  it('Runs once on mount', () => {
    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      useMountSafe(callback);

      return null;
    };

    const callback = jest.fn();

    const { rerender } = testRender(<TestComponent callback={callback} />);
    expect(callback).toHaveBeenCalledTimes(1);

    const updatedCallback = jest.fn();

    rerender(<TestComponent callback={callback} />);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(updatedCallback).toHaveBeenCalledTimes(0);
  });
});
