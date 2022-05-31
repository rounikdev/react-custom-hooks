import { FC } from 'react';

import { testRender } from '@services/utils';

import { useIsNotRendered } from '../useIsNotRendered';

describe('useIsRendered', () => {
  it('Provides the correct rendered state', () => {
    const mockCallback = jest.fn();

    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      // eslint-disable-next-line testing-library/render-result-naming-convention
      const isRendered = useIsNotRendered({ callback });

      if (!isRendered) {
        callback();
      }

      return null;
    };

    const { rerender } = testRender(<TestComponent callback={mockCallback} />);

    expect(mockCallback).toHaveBeenCalledTimes(1);

    rerender(<TestComponent callback={mockCallback} />);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
