import * as React from 'react';
import * as UIComponents from '../../uicomponents/UIComponents';
import ShapeFactory, { createShape } from '../../util/shapeFactory';
import * as util from '../../util/common';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as shapeboxActions from './actions';
import * as editorboxActions from '../Editor/actions';
import Interfaces from '../../appInterfaces';
const combinedActions = { ...shapeboxActions, ...editorboxActions };

interface IProps {
  actionDispatcher: typeof combinedActions;
}
interface IState {
  UIShapes: Interfaces.IButtonMetaInfo[];
}
class Shapebox extends React.Component<IProps, IState> {
  public shapeFactory: ShapeFactory;
  constructor(props: IProps) {
    super(props);
    this.state = {
      UIShapes: UIComponents.UIShapes,
    };
    this.createShapes = this.createShapes.bind(this);
  }
  public componentWillMount() {
    this.shapeFactory = new ShapeFactory();
    Object.keys(UIComponents.UISHAPETYPE).forEach((key: string) => {
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
    const { UIShapes } = this.state;
    return (
      <div id="shapebox" className="shape-box">
        <div>拖动这里的UI控件到中间栏呀</div>
        {UIShapes.map(
          (shape: Interfaces.IButtonMetaInfo, shapeIndex: number) => (
            <div
              id={`shape-${shapeIndex}`}
              key={shapeIndex}
              style={{ position: 'relative', width: 80, height: 80 }}
              onMouseDown={this.startMoveShape.bind(this, shape)}
            />
          ),
        )}
      </div>
    );
  }

  // 创建图库基础图元
  private createShapes = () => {
    // 遍历工具组，再遍历组中的图元，放到render里为每个图元创建的stage中
    this.state.UIShapes.map(
      (shape: Interfaces.IButtonMetaInfo, shapeIndex: number) => {
        const shapeClone = JSON.parse(JSON.stringify(shape));
        util.shapeScaleAndXY(shapeClone, 30, 30);
        const shapeWrap = 'shape-' + '' + shapeIndex;
        shapeClone.attrs.shapeMountPoint = shapeWrap;
        const id = '' + shapeIndex;
        // shapeClone.attrs.shapeId = id;
        shapeClone.attrs.id = id;
        shapeClone.attrs.left = 0;
        shapeClone.attrs.top = 0;
        shapeClone.attrs.isShapebox = true;
        const shapeInstance: Interfaces.IButton = this.createShapeInstance(
          shapeClone,
          this.shapeFactory,
        );
        shapeInstance.render();
      },
    );
  };
  // shapebox 根据shape类型，用shapeFactory创建基本图元,所有shapebox图元的创建都要经过这里
  private createShapeInstance(
    shape: Interfaces.IButtonMetaInfo,
    shapeFactory: ShapeFactory,
  ) {
    const instance: Interfaces.IButton = createShape(shape, shapeFactory, true);
    return instance;
  }

  // 开始移动某个图元
  private startMoveShape(shape: Interfaces.IButtonMetaInfo, e: any) {
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
      // shapeClone.attrs.layerX = shapeLeft;
      // shapeClone.attrs.layerY = shapeTop;
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
