import { FC } from 'react';

import { testRender } from '@services/utils';

import { useBeforeFirstRender } from '../useBeforeFirstRender';

describe('useBeforeFirstRender', () => {
  it('Executes callback before initial render', () => {
    const mockCallback = jest.fn();

    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      useBeforeFirstRender(callback);

      return null;
    };

    const { rerender } = testRender(<TestComponent callback={mockCallback} />);

    expect(mockCallback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={mockCallback} />);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
