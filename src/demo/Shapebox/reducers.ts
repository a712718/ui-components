import * as Constants from '../../appConstants';
const initialState = {
  shapes: [],
};

function shapeboxReducer(state: any = initialState, action: any) {
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
      shapes.forEach((item: any) => {
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
      shapes.forEach((item: any) => {
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
