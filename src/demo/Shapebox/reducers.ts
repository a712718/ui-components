import { AnyAction } from 'redux';
import * as Constants from '../../appConstants';
import Interfaces from '../../appInterfaces';

interface IState {
  shapes: Interfaces.IButton[];
}

const initialState: IState = {
  shapes: [],
};

function shapeboxReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case Constants.ShapeboxActionType.CREATE_SHAPE: {
      const shapes = [...state.shapes];
      shapes.push(action.data);
      return {
        ...state,
        shapes,
      };
    }
    case Constants.EditorboxActionType.SELECT_SHAPE: {
      const shapes = [...state.shapes];
      shapes.forEach((item: Interfaces.IButton) => {
        item.attrs.display =
          item.attrs.id === action.data.attrs.id ? 'block' : 'none';
      });
      return {
        ...state,
        shapes,
      };
    }
    case Constants.EditorboxActionType.DESELECT_SHAPE: {
      const shapes = [...state.shapes];
      shapes.forEach((item: Interfaces.IButton) => {
        item.attrs.display = 'none';
      });
      return {
        ...state,
        shapes,
      };
    }
    default:
      return state;
  }
}
export default shapeboxReducer;
