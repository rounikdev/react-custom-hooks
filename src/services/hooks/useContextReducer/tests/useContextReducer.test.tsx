import { createContext, FC, ReactNode, useContext } from 'react';
import userEvent from '@testing-library/user-event';

import { testRender } from '@services/utils';

import { useContextReducer } from '../useContextReducer';

type TItemId = string | number;

enum ActionType {
  ADD_ITEM = 'ADD_ITEM',
  DELETE_ITEM = 'DELETE_ITEM'
}

interface IAddItem {
  type: ActionType.ADD_ITEM;
  payload: TItemId;
}

interface IDeleteItem {
  type: ActionType.DELETE_ITEM;
  payload: TItemId;
}

type TAction = IAddItem | IDeleteItem;

interface IInitialState {
  items: TItemId[];
}

interface IActions {
  addItem: (item: TItemId) => void;
  deleteItem: (item: TItemId) => void;
}

const reducer = (state: IInitialState, action: TAction): IInitialState => {
  switch (action.type) {
    case ActionType.ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };

    case ActionType.DELETE_ITEM:
      const itemToDeleteIndex = state.items.findIndex((item) => item === action.payload);

      if (itemToDeleteIndex !== -1) {
        const newItems = [...state.items];

        newItems.splice(itemToDeleteIndex, 1);

        return { ...state, items: newItems };
      } else {
        return state;
      }

    default:
      throw new Error(`No such action`);
  }
};

const ACTION_TYPES = {
  addItem: ActionType.ADD_ITEM,
  deleteItem: ActionType.DELETE_ITEM
};

const initialState: IInitialState = {
  items: []
};

const initialContextState = {
  actions: {
    addItem: () => {
      throw new Error('No Buckets Provider');
    },
    deleteItem: () => {
      throw new Error('No Buckets Provider');
    }
  } as unknown as IActions,
  state: initialState
};

const ItemsContext = createContext(initialContextState);

export const ItemsProvider: FC<{
  children: ReactNode;
}> = ({ children }): JSX.Element => {
  const { value } = useContextReducer({
    actions: initialContextState.actions,
    actionTypes: ACTION_TYPES,
    initialState,
    reducer
  });

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
};

export const useItems = () => useContext(ItemsContext);

describe('useContextReducer', () => {
  it('Provides the correct value for the Provider', () => {
    const TestComponent: FC = () => {
      const {
        actions: { addItem, deleteItem },
        state: { items }
      } = useItems();

      return (
        <div>
          <button data-test="add-item" onClick={() => addItem(items.length + 1)}>
            Add
          </button>
          <button data-test="delete-item" onClick={() => deleteItem(items.length)}>
            Add
          </button>
          <p>{JSON.stringify(items)}</p>
        </div>
      );
    };

    const { getByDataTest, getByText } = testRender(
      <ItemsProvider>
        <TestComponent />
      </ItemsProvider>
    );

    userEvent.click(getByDataTest('add-item'));

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('[1]')).toBeInTheDocument();

    userEvent.click(getByDataTest('delete-item'));

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('[]')).toBeInTheDocument();
  });
});
