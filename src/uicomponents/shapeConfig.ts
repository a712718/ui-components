import { SHAPE_TYPE } from './constants';
export const UIShapeGroups = [
  {
    id: 0,
    name: 'UI高级',
    collapse: true,
    shapes: [
      {
        type: SHAPE_TYPE.UIButton,
        attrs: {
          name: 'button',
          x: 0,
          y: 0,
          text: 'button',
          width: 80,
          height: 80,
          enclosingWidth: 80,
          enclosingHeight: 80,
          color: 'black',
          background: 'pink',
          isUIComponent: true,
        },
      },
      {
        type: SHAPE_TYPE.UIText,
        attrs: {
          name: 'text',
          x: 0,
          y: 0,
          text: 'textarea',
          width: 80,
          height: 80,
          enclosingWidth: 80,
          enclosingHeight: 80,
          color: 'black',
          background: 'pink',
          isUIComponent: true,
        },
      },
    ],
  },
];
