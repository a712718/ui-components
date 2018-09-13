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
    default:
      return state;
  }
}
export default shapeboxReducer;
