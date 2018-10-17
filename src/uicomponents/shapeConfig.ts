import { SHAPE_TYPE } from './constants';
import * as Interfaces from './interfaces';
export const UIShapes: Interfaces.IButtonMetaInfo[] = [
  {
    type: SHAPE_TYPE.UIButton,
    attrs: {
      name: 'button',
      text: 'button',
      x: 0,
      y: 0,
      width: 80,
      height: 80,
      enclosingWidth: 80,
      enclosingHeight: 80,
      isUIComponent: true,
      scale: {
        x: 1,
        y: 1,
      },
    },
  },
];
