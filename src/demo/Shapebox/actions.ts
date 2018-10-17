import { AnyAction } from 'redux';
import * as Constants from '../../appConstants';
import Interfaces from '../../appInterfaces';
export const createShape = (shape: Interfaces.IButton): AnyAction => {
  return {
    type: Constants.ShapeboxActionType.CREATE_SHAPE,
    data: shape,
  };
};
