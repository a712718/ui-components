import { AnyAction } from 'redux';
import * as Constants from '../../appConstants';
export const createShape = (shape: any): AnyAction => {
  return {
    type: Constants.ShapeboxActionType.CREATE_SHAPE,
    data: shape,
  };
};
