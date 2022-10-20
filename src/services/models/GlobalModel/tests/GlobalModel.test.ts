import { DependencyList } from 'react';

import { Comparator } from '@services/hooks/types';

import { GlobalModel } from '../GlobalModel';

describe('GlobalModel', () => {
  it('deepClone', () => {
    const object = {
      firstName: 'Ivan',
      lastName: 'Ivanov',
      phoneNumbers: [234567]
    };

    expect(GlobalModel.deepClone(object)).toEqual(object);
  });

  it('hasDependencyListDiff', () => {
    const test = [
      { expected: false, input: { comparator: true, newValue: [0], prevValue: [0] } },
      {
        expected: false,
        input: {
          comparator: (({ newValue, prevValue }) =>
            newValue.some((el, index) => el !== prevValue[index])) as Comparator<
            DependencyList,
            DependencyList
          >,
          newValue: [0],
          prevValue: [0]
        }
      },
      {
        expected: false,
        input: {
          newValue: [0],
          prevValue: [0]
        }
      }
    ];

    test.forEach(({ expected, input }) =>
      expect(GlobalModel.hasDependencyListDiff(input)).toBe(expected)
    );
  });

  it('hasValueDiff', () => {
    const test = [
      {
        expected: false,
        // eslint-disable-next-line sort-keys-fix/sort-keys-fix
        input: { comparator: true, newValue: { b: 20, a: 30 }, prevValue: { a: 30, b: 20 } }
      },
      {
        expected: true,
        input: {
          comparator: (({ newValue, prevValue }) => newValue === prevValue - 1) as Comparator<
            number,
            number
          >,
          newValue: 0,
          prevValue: 1
        }
      },
      {
        expected: true,
        input: {
          newValue: { a: 30, b: 20 },
          prevValue: { a: 30, b: 20 }
        }
      }
    ];

    test.forEach(({ expected, input }) => expect(GlobalModel.hasValueDiff(input)).toBe(expected));
  });
});
