import { FC } from 'react';
import { waitFor } from '@testing-library/react';

import { testRender } from '@services/utils';

import { useWindowResize } from '../useWindowResize';

const TestComponent: FC<{ callback: ResizeObserverCallback }> = ({ callback }) => {
  useWindowResize({ callback, debounceTime: 200 });

  return null;
};

describe('useWindowResize', () => {
  it('Expect resize callback to be called after specified `debounceTime`', async () => {
    jest.useFakeTimers();

    const mockCallback = jest.fn();
    testRender(<TestComponent callback={mockCallback} />);

    window.dispatchEvent(new Event('resize'));

    jest.advanceTimersByTime(200);
    expect(mockCallback).toBeCalledTimes(1);

    jest.clearAllTimers();
  });
});
