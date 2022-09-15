import { useMemo, useReducer } from 'react';

export const useContextReducer = <F, T, R, M>({
  actionTypes,
  initialState,
  reducer
}: {
  actionTypes: Record<string, M>;
  actions: F;
  initialState: T;
  reducer: (state: T, action: R) => T;
}): {
  value: {
    actions: F;
    state: T;
  };
} => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const newActions = useMemo(
    () =>
      Object.keys(actionTypes).reduce((accum, actionName) => {
        (accum as unknown as { [key: string]: keyof F })[actionName] = ((payload: unknown) => {
          dispatch({ payload, type: actionTypes[actionName] } as unknown as R);
        }) as unknown as keyof F;

        return accum;
      }, {} as F),

    [actionTypes]
  );

  const newValue = useMemo(() => ({ actions: newActions, state }), [newActions, state]);

  return { value: newValue };
};
