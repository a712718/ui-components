import { AnyAction } from 'redux';
import * as Contants from '../constants';
import * as Interfaces from '../interfaces';
export const setShapeAttrs = (shape: Interfaces.IButtonAttrs): AnyAction => {
  return {
    type: Contants.AttrsboxActionType.SET_SHAPE_ATTRS,
    data: shape,
  };
};
