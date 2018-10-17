// import { v1 } from 'uuid';
import * as R from 'ramda';
import { Victor as V } from './Vector2D';
import Interfaces from '../appInterfaces';
class ShapeFactory {
  private shapes = new Map();

  public registerShape = (type: string, shape: any) => {
    if (type && shape) {
      this.shapes.set(type, shape);
    }
  };

  public getShape = (
    type: string,
    options: Interfaces.IButtonMetaAttrs,
  ): any | null => {
    const shape = this.shapes.get(type);
    if (shape) {
      // const id = !!options.id ? options.id : `${type}-${v1()}`;
      options.type = type;
      const shapeInstance = new shape({
        ...options,
        // id,
        draggable: true,
        start: V.fromArray([options.x, options.y]),
        enclosingHeight: options.enclosingHeight,
        enclosingWidth: options.enclosingWidth,
      });

      // 图元拖拽时，DrawLayer 层的图元保持不动
      if (!options.isUIComponent) {
        shapeInstance.dragBoundFunc((pos: any) => {
          return {
            x: shapeInstance.getAbsolutePosition().x,
            y: shapeInstance.getAbsolutePosition().y,
          };
        });
      }

      return shapeInstance;
    }

    return null;
  };
}

export const createShape = (
  shape: any,
  shapeFactory: ShapeFactory,
  isShapeBox?: boolean,
): any | null => {
  // if (typeof shape.attrs.layerX === 'undefined') {
  //   shape.attrs.layerX = shape.attrs.x;
  //   shape.attrs.layerY = shape.attrs.y;
  // }
  const { scale, ...property } = shape.attrs;
  if (isShapeBox) {
    property.scale = scale;
  }
  const node = shapeFactory.getShape(shape.type, property);
  if (!node) {
    return null;
  }
  return node;
};

export const createShapes = (
  shapes: Interfaces.IButtonMetaInfo[],
  shapeFactory: ShapeFactory,
): Interfaces.IButton[] => {
  const resultShapes: Interfaces.IButton[] = [];
  R.map((shape: Interfaces.IButtonMetaInfo) => {
    const node = createShape(shape, shapeFactory);
    if (!node) {
      return;
    }
    resultShapes.push(node);
    return node;
  })(shapes);

  return resultShapes;
};

export default ShapeFactory;
