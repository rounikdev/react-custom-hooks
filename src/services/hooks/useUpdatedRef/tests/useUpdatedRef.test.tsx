import { FC, useCallback } from 'react';

import { testRender } from '@services/utils';

import { useUpdatedRef } from '../useUpdatedRef';

describe('useUpdatedRef', () => {
  it('Returns updated ref value from memoized function', () => {
    const TestComponent: FC<{ value: string }> = ({ value }) => {
      const ref = useUpdatedRef(value);

      const renderValue = useCallback(() => ref.current, [ref]);

      return <div data-test="value">{renderValue()}</div>;
    };

    const valueA = 'valueA';
    const valueB = 'valueB';

    const { getByDataTest, rerender } = testRender(<TestComponent value={valueA} />);

    expect(getByDataTest('value')).toHaveTextContent(valueA);

    rerender(<TestComponent value={valueB} />);

    expect(getByDataTest('value')).toHaveTextContent(valueB);
  });

  // eslint-disable-next-line max-len
  it('Returns non updated ref value from memoized function passing `comparator` function', () => {
    const TestComponent: FC<{ value: number }> = ({ value }) => {
      const ref = useUpdatedRef(value, ({ newValue, prevValue }) => newValue === prevValue + 1);

      const renderValue = useCallback(() => ref.current, [ref]);

      return <div data-test="value">{renderValue()}</div>;
    };

    const valueA = 0;
    const valueB = 2;

    const { getByDataTest, rerender } = testRender(<TestComponent value={valueA} />);

    expect(getByDataTest('value')).toHaveTextContent(valueA.toString());

    rerender(<TestComponent value={valueB} />);

    expect(getByDataTest('value')).toHaveTextContent(valueA.toString());
  });

  it('Returns non updated ref value from memoized function passing `comparator` true', () => {
    const TestComponent: FC<{ value: { a: number } }> = ({ value }) => {
      const ref = useUpdatedRef(value, true);

      const renderValue = useCallback(() => ref.current, [ref]);

      return <div data-test="value">{JSON.stringify(renderValue())}</div>;
    };

    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    const valueA = { b: 10, a: 20 };
    const valueB = { a: 20, b: 10 };

    const { getByDataTest, rerender } = testRender(<TestComponent value={valueA} />);

    expect(getByDataTest('value')).toHaveTextContent(JSON.stringify(valueA));

    rerender(<TestComponent value={valueB} />);

    expect(getByDataTest('value')).toHaveTextContent(JSON.stringify(valueA));
  });
});
