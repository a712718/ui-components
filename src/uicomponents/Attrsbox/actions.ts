import { AnyAction } from 'redux';
export const setShapeAttrs = (shape: any): AnyAction => {
  return {
    type: 'SET_SHAPE_ATTRS',
    data: shape,
  };
};
