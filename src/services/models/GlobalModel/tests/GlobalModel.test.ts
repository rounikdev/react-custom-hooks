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
      { expected: false, input: { comparator: true, prevValue: [0], value: [0] } },
      {
        expected: false,
        input: {
          comparator: (({ newValue, prevValue }) =>
            newValue.some((el, index) => el !== prevValue[index])) as Comparator<
            DependencyList,
            DependencyList
          >,
          prevValue: [0],
          value: [0]
        }
      },
      {
        expected: false,
        input: {
          prevValue: [0],
          value: [0]
        }
      }
    ];

    test.forEach(({ expected, input }) =>
      expect(GlobalModel.hasDependencyListDiff(input)).toBe(expected)
    );
  });
});
