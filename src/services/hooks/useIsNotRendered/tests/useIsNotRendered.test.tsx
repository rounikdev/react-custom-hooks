import { FC } from 'react';

import { testRender } from '@services/utils';

import { useIsNotRendered } from '../useIsNotRendered';

describe('useIsRendered', () => {
  it('Executes callback before initial render', () => {
    const mockCallback = jest.fn();

    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      useIsNotRendered({ callback });

      return null;
    };

    const { rerender } = testRender(<TestComponent callback={mockCallback} />);

    expect(mockCallback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={mockCallback} />);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
