import userEvent from '@testing-library/user-event';
import { FC, useState } from 'react';

import { testRender } from '@services/utils';

import { useUpdateSync } from '../useUpdateSync';

describe('useNewDiffValue', () => {
  it('Executes callback on a new value diff without `comparator`', async () => {
    const mockCallback = jest.fn();

    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      const [value, setValue] = useState({});

      useUpdateSync(callback, value);

      return (
        <button data-test="button-update" onClick={() => setValue({})}>
          Update
        </button>
      );
    };

    const { getByDataTest } = testRender(<TestComponent callback={mockCallback} />);

    await userEvent.click(getByDataTest('button-update'));

    expect(mockCallback).toHaveBeenCalledTimes(1);

    await userEvent.click(getByDataTest('button-update'));

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  it('Executes callback on a new value diff with `comparator`', async () => {
    const mockCallback = jest.fn();

    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      const [value, setValue] = useState(0);

      useUpdateSync(callback, value, ({ newValue, prevValue }) => newValue === prevValue + 1);

      return (
        <button data-test="button-update" onClick={() => setValue((prevState) => prevState + 1)}>
          Update
        </button>
      );
    };

    const { getByDataTest } = testRender(<TestComponent callback={mockCallback} />);

    await userEvent.click(getByDataTest('button-update'));

    expect(mockCallback).toHaveBeenCalledTimes(1);

    await userEvent.click(getByDataTest('button-update'));

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  // eslint-disable-next-line max-len
  it('Does not execute callback on a new value object with the same structure when `comparator` true is passed', async () => {
    const mockCallback = jest.fn();

    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      const [value, setValue] = useState({ a: 20 });

      useUpdateSync(callback, value, true);

      return (
        <button data-test="button-update" onClick={() => setValue({ a: 20 })}>
          Update
        </button>
      );
    };

    const { getByDataTest } = testRender(<TestComponent callback={mockCallback} />);

    await userEvent.click(getByDataTest('button-update'));

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
});
