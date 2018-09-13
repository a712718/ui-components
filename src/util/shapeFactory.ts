// import { v1 } from 'uuid';
import * as R from 'ramda';
import { Victor as V } from './Vector2D';
class ShapeFactory {
  private shapes = new Map();

  public registerShape = (type: string, shape: any) => {
    if (type && shape) {
      this.shapes.set(type, shape);
    }
  };

  public getShape = (type: string, options: any): any | null => {
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
  if (typeof shape.attrs.layerX === 'undefined') {
    shape.attrs.layerX = shape.attrs.x;
    shape.attrs.layerY = shape.attrs.y;
  }

  const { scale, scaleX, scaleY, animation, ...property } = shape.attrs;
  if (isShapeBox) {
    property.scaleX = scaleX;
    property.scaleY = scaleY;
    property.scale = scale;
  }
  const node = shapeFactory.getShape(shape.type, property);
  if (!node) {
    return null;
  }

  if (shape.type === 'Group') {
    const groupNode = node as any;
    const children: any[] = shape.children!;
    if (children.length > 0) {
      children.forEach((child: any) => {
        const subNode = createShape(child, shapeFactory);
        if (subNode) {
          groupNode.add(subNode);
        }
      });
    }
  }
  return node;
};

export const createShapes = (
  shapes: any[],
  shapeFactory: ShapeFactory,
): any[] => {
  const resultShapes: any[] = [];
  R.map((shape: any) => {
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
