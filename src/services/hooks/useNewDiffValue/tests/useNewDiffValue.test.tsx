import { FC, useState } from 'react';
import userEvent from '@testing-library/user-event';

import { testRender } from '@services/utils';

import { useNewDiffValue } from '../useNewDiffValue';

describe('useNewDiffValue', () => {
  it('Executes callback on new diff of value', () => {
    const mockCallback = jest.fn();

    const TestComponent: FC<{ callback: () => void }> = ({ callback }) => {
      const [value, setValue] = useState({});

      useNewDiffValue({ callback, value });

      return (
        <button data-test="button-update" onClick={() => setValue({})}>
          Update
        </button>
      );
    };

    const { getByDataTest } = testRender(<TestComponent callback={mockCallback} />);

    userEvent.click(getByDataTest('button-update'));

    expect(mockCallback).toHaveBeenCalledTimes(1);

    userEvent.click(getByDataTest('button-update'));

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
});
