import * as Interfaces from '../interfaces';
import * as Contants from '../constants';
import { AnyAction } from 'redux';
const initialState: Interfaces.IButtonAttrs = {
  type: '',
  id: '',
  name: 'button1',
  x: 0,
  y: 0,
  text: 'button',
  width: 0,
  height: 0,
  enclosingHeight: 0,
  enclosingWidth: 0,
  isShapebox: false,
  isUIComponent: true,
  shapeMountPoint: '',
  attrsboxMountPoint: '',
  display: '',
  zIndex: 0,
};

function attrsboxReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case Contants.AttrsboxActionType.SET_SHAPE_ATTRS: {
      const shapeAttrsCopy = { ...state, ...action.data };
      return {
        ...state,
        ...shapeAttrsCopy,
      };
    }
    default:
      return state;
  }
}
export default attrsboxReducer;
