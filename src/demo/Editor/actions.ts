import * as Constants from '../../appConstants';
import { AnyAction } from 'redux';
export const selectShape = (shape: any): AnyAction => {
  return {
    type: Constants.EditorboxActionType.SELECT_SHAPE,
    data: shape,
  };
};
export const deselectShape = (shape: any): AnyAction => {
  return {
    type: Constants.EditorboxActionType.DESELECT_SHAPE,
    data: shape,
  };
};
