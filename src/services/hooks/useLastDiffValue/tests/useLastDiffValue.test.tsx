import { FC, useState } from 'react';
import userEvent from '@testing-library/user-event';

import { testRender } from '@services/utils';

import { useLastDiffValue } from '../useLastDiffValue';

type Comparator = ({ prevValue, newValue }: { prevValue: number; newValue: number }) => boolean;

const TestComponent: FC<{
  comparator?: Comparator;
}> = ({ comparator }) => {
  const [value, setValue] = useState(0);

  const prevValue = useLastDiffValue(value, comparator);

  return (
    <>
      <button data-test="update-value" onClick={() => setValue((prevValue) => prevValue + 1)}>
        Update
      </button>
      <p data-test="read-value">
        value: {value} prevValue: {prevValue}
      </p>
    </>
  );
};

describe('useLastDiffValue', () => {
  it('Returns expected `prevValue`', async () => {
    const { getByDataTest, findByText } = testRender(<TestComponent />);

    const btnUpdate = getByDataTest('update-value');

    userEvent.click(btnUpdate);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(await findByText('value: 1 prevValue: 0')).toBeInTheDocument();
  });

  it('Returns expected `prevValue` based on `comparator` function', async () => {
    const comparator: Comparator = ({ prevValue, newValue }) => {
      return prevValue === newValue - 2;
    };

    const { getByDataTest, findByText } = testRender(<TestComponent comparator={comparator} />);

    const btnUpdate = getByDataTest('update-value');

    userEvent.click(btnUpdate);
    userEvent.click(btnUpdate);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(await findByText('value: 2 prevValue: 0')).toBeInTheDocument();
  });
});
