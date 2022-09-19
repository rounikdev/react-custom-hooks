import { FC, useState } from 'react';
import userEvent from '@testing-library/user-event';

import { testRender } from '@services/utils';

import { Comparator } from '../../types';
import { useLastDiffValue } from '../useLastDiffValue';

const TestComponent: FC<{
  comparator?: boolean | Comparator<number, number>;
}> = ({ comparator }) => {
  const [value, setValue] = useState(0);

  const prevValue = useLastDiffValue(value, comparator);

  return (
    <>
      <button data-test="update-value" onClick={() => setValue((prevState) => prevState + 1)}>
        Update
      </button>
      <p data-test="read-value">
        value: {value} prevValue: {prevValue}
      </p>
    </>
  );
};

describe('useLastDiffValue', () => {
  it('Returns expected `prevValue` with `comparator` true', async () => {
    const { findByText, getByDataTest } = testRender(<TestComponent comparator={true} />);

    const btnUpdate = getByDataTest('update-value');

    userEvent.click(btnUpdate);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(await findByText('value: 1 prevValue: 0')).toBeInTheDocument();
  });

  it('Returns expected `prevValue` without `comparator`', async () => {
    const { findByText, getByDataTest } = testRender(<TestComponent />);

    const btnUpdate = getByDataTest('update-value');

    userEvent.click(btnUpdate);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(await findByText('value: 1 prevValue: 0')).toBeInTheDocument();
  });

  it('Returns expected `prevValue` based on `comparator` function', async () => {
    const comparator = ({ newValue, prevValue }: { newValue: number; prevValue: number }) => {
      return prevValue === newValue - 2;
    };

    const { findByText, getByDataTest } = testRender(<TestComponent comparator={comparator} />);

    const btnUpdate = getByDataTest('update-value');

    userEvent.click(btnUpdate);
    userEvent.click(btnUpdate);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(await findByText('value: 2 prevValue: 0')).toBeInTheDocument();
  });
});
