import { FC } from 'react';

import { ShowHide, testRender } from '@services/utils';

import { useUnmountSafe } from '../useUnmountSafe';

describe('useUnmountSafe', () => {
  it('Calls the callback once on unmounting the host component', () => {
    const TestComponent: FC<{ callback: () => void; className: string }> = ({
      callback,
      className
    }) => {
      useUnmountSafe(callback);

      return <div className={className}></div>;
    };

    const callback = jest.fn();

    const { rerender } = testRender(
      <ShowHide data="someClass" show={true}>
        {(show, data) => {
          return show ? <TestComponent callback={callback} className={data} /> : null;
        }}
      </ShowHide>
    );

    expect(callback).toHaveBeenCalledTimes(0);

    rerender(
      <ShowHide data="anotherClass" show={true}>
        {(show, data) => {
          return show ? <TestComponent callback={callback} className={data} /> : null;
        }}
      </ShowHide>
    );

    expect(callback).toHaveBeenCalledTimes(0);

    rerender(
      <ShowHide data="anotherClass" show={false}>
        {(show, data) => {
          return show ? <TestComponent callback={callback} className={data} /> : null;
        }}
      </ShowHide>
    );

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
