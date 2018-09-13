import * as React from 'react';
import * as UIComponents from '../../uicomponents/UIComponents';
import ShapeFactory, { createShape } from '../../util/shapeFactory';
import * as util from '../../util/common';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as shapeboxActions from './actions';
import * as editorboxActions from '../Editor/actions';
const combinedActions = { ...shapeboxActions, ...editorboxActions };

class Shapebox extends React.Component<any, any> {
  public UIComponents: any[];
  public shapeFactory: ShapeFactory;
  constructor(props: any) {
    super(props);
    this.state = {
      shapeGroups: UIComponents.UIShapeGroups,
      shapes: [],
      selectedShape: [],
      first: true,
    };
    this.createShapes = this.createShapes.bind(this);
  }
  public componentWillMount() {
    this.shapeFactory = new ShapeFactory();
    Object.keys(UIComponents.UISHAPETYPE).forEach((key: any) => {
      this.shapeFactory.registerShape(
        (UIComponents.UISHAPETYPE as any)[key],
        (UIComponents as any)[key],
      );
    });
  }
  public componentDidMount() {
    this.createShapes();
  }

  public render() {
    const { shapeGroups } = this.state;
    return (
      <div id="shapebox" className="shape-box">
        {shapeGroups.map((shapeGroup: any, groupIndex: number) => (
          <div key={groupIndex} style={{ width: 200, height: 200 }}>
            {shapeGroup.shapes.map((shape: any, shapeIndex: number) => (
              <div
                id={`shape-${groupIndex}${shapeIndex}`}
                key={shapeIndex}
                style={{ position: 'relative', width: 80, height: 80 }}
                onMouseDown={this.startMoveShape.bind(
                  this,
                  shape,
                  this.shapeFactory,
                )}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // 创建图库基础图元
  private createShapes = () => {
    // 遍历工具组，再遍历组中的图元，放到render里为每个图元创建的stage中
    this.state.shapeGroups.map((groupItem: any, groupIndex: number) => {
      groupItem.shapes.map((shape: any, shapeIndex: number) => {
        const shapeClone = JSON.parse(JSON.stringify(shape));
        util.shapeScaleAndXY(shapeClone, 30, 30);
        const shapeWrap = 'shape-' + groupIndex + '' + shapeIndex;
        shapeClone.attrs.shapeMountPoint = shapeWrap;
        const id = groupIndex + '' + shapeIndex;
        shapeClone.attrs.shapeId = id;
        shapeClone.attrs.id = id;
        shapeClone.attrs.left = 0;
        shapeClone.attrs.top = 0;
        shapeClone.attrs.isShapebox = true;
        const shapeInstance = this.createShapeInstance(
          shapeClone,
          this.shapeFactory,
        );
        shapeInstance.render();
      });
    });
  };
  // shapebox 根据shape类型，用shapeFactory创建基本图元,所有shapebox图元的创建都要经过这里
  private createShapeInstance(shape: any, shapeFactory: any) {
    const instance = createShape(shape, shapeFactory, true);
    return instance;
  }

  // 开始移动某个图元
  private startMoveShape(shape: any, shapeFactory: any, e: any) {
    e.persist();
    let shapeTop = e.clientY;
    let shapeLeft = e.clientX;

    document.onmousemove = (e: any) => {
      shapeTop = e.clientY;
      shapeLeft = e.clientX;
      return false;
    };

    document.onmouseup = () => {
      const shapeClone = JSON.parse(JSON.stringify(shape));
      const windowWidth = window.innerWidth;
      shapeLeft = shapeLeft - windowWidth / 3;
      shapeClone.attrs.x = shapeLeft;
      shapeClone.attrs.y = shapeTop;
      shapeClone.attrs.layerX = shapeLeft;
      shapeClone.attrs.layerY = shapeTop;
      const id = `${shape.type}-${v1()}`;
      shapeClone.attrs.id = id;
      shapeClone.attrs.shapeMountPoint = 'shape-' + id;
      shapeClone.attrs.attrsboxMountPoint = 'attrsbox-' + id;
      const shapeInstance = this.createShapeInstance(
        shapeClone,
        this.shapeFactory,
      );
      this.props.actionDispatcher.createShape(shapeInstance);
      this.props.actionDispatcher.selectShape(shapeInstance);
      document.onmousemove = null;
      document.onmouseup = null;
    };

    return false;
  }
}

const mapStateToProps = (state: any) => {
  return {
    attrsbox: state.attrsbox,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return { actionDispatcher: bindActionCreators(combinedActions, dispatch) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shapebox);
