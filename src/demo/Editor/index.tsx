import * as React from 'react';
import * as combinedActions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Interfaces from '../../appInterfaces';
interface IProps {
  actionDispatcher: typeof combinedActions;
  shapes: Interfaces.IButton[];
}

class UIButton extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.selectShape = this.selectShape.bind(this);
    this.delSelectAll = this.delSelectAll.bind(this);
  }
  public componentDidUpdate() {
    setTimeout(() => {
      this.props.shapes.map((item: Interfaces.IButton) => {
        item.render();
      });
    });
  }
  public render() {
    const shapes = this.props.shapes;
    // 第一次render的时候redux没有更新，所以this.props.attrsbox.shapeAttrs为{}，要第二次才可以
    return (
      <div id="editorbox" className="editor-box" onClick={this.delSelectAll}>
        {shapes.map((shape: Interfaces.IButton, shapeIndex: number) => (
          <div
            key={shapeIndex}
            id={`shape-${shape.attrs.id}`}
            onClick={this.selectShape.bind(this, shape)}
          />
        ))}
      </div>
    );
  }
  private selectShape(shape: Interfaces.IButton, e: any) {
    e.stopPropagation();
    this.props.actionDispatcher.selectShape(shape);
  }

  private delSelectAll(e: any) {
    e.stopPropagation();
    this.props.actionDispatcher.deselectShape(null);
  }
}

const mapStateToProps = (state: any) => {
  return {
    shapes: state.shapebox.shapes,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actionDispatcher: bindActionCreators(combinedActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UIButton);
