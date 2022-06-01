import { useMemo, useReducer } from 'react';

export const useContextReducer = <F, T, R, M>({
  actionTypes,
  initialState,
  reducer
}: {
  actions: F;
  actionTypes: Record<string, M>;
  initialState: T;
  reducer: (state: T, action: R) => T;
}): {
  value: {
    state: T;
    actions: F;
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

  const newValue = useMemo(() => ({ state, actions: newActions }), [newActions, state]);

  return { value: newValue };
};
