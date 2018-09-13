import * as Constants from '../../appConstants';
const initialState = {
  selectedShape: [],
};

function editorboxReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case Constants.EditorboxActionType.SELECT_SHAPE: {
      const selectedShape = [];
      selectedShape.push(action.data);
      return {
        ...state,
        selectedShape,
      };
    }
    case Constants.EditorboxActionType.DESELECT_SHAPE: {
      return {
        ...state,
        selectedShape: [],
      };
    }
    default:
      return state;
  }
}
export default editorboxReducer;
