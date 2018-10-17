import * as Constants from '../../appConstants';
import Interfaces from '../../appInterfaces';
import { AnyAction } from 'redux';
export const selectShape = (shape: Interfaces.IButton): AnyAction => {
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
