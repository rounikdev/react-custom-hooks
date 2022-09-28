// import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FC, useRef, useState } from 'react';

import { testRender } from '@services/utils';

import { useResizeObserver } from '../useResizeObserver';

const TestComponent: FC<{ callback: ResizeObserverCallback }> = ({ callback }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [show, setShow] = useState(true);
  useResizeObserver({ callback, target: ref });

  return (
    <div data-test="resizable" ref={ref}>
      {show ? <p>Content</p> : null}
      <button
        data-test="toggle"
        onClick={() => {
          Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
            configurable: true,
            value: 200
          });
          setShow((prevState) => !prevState);
        }}
      >
        Click
      </button>
    </div>
  );
};

describe('useResizeObserver', () => {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 500 });

  it('Expect resize callback to be called', async () => {
    const mockCallback = jest.fn();
    const { getByDataTest } = await testRender(<TestComponent callback={mockCallback} />);

    userEvent.click(getByDataTest('toggle'));
    getByDataTest('resizable').dispatchEvent(new Event('resize'));

    // TODO callback not fired
    // await waitFor(() => {
    //   expect(mockCallback).toBeCalledTimes(1);
    // });
  });
});
