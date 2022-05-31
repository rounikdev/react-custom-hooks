import { useMemo, useReducer } from 'react';

export const useContextReducer = <T, R, M>({
  actionTypes,
  initialState,
  reducer
}: {
  actionTypes: { [key: string]: M };
  initialState: T;
  reducer: (state: T, action: R) => T;
}): {
  value: {
    state: T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actions: any;
  };
} => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const newActions = useMemo(
    () =>
      Object.keys(actionTypes).reduce((accum, actionName) => {
        accum[actionName] = (payload) => {
          dispatch({ payload, type: actionTypes[actionName] } as unknown as R);
        };

        return accum;
      }, {} as { [key: string]: (payload: unknown) => void }),

    [actionTypes]
  );

  const newValue = useMemo(() => ({ state, actions: newActions }), [newActions, state]);

  return { value: newValue };
};
