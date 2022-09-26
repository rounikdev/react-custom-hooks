import userEvent from '@testing-library/user-event';
import { FC, useState } from 'react';

import { testRender } from '@services/utils';

import { useUpdateSync } from '../useUpdateSync';

describe('useNewDiffValue', () => {
  it('Executes callback on new diff of value', async () => {
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
});
