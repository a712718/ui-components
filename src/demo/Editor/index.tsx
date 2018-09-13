import * as React from 'react';
import * as combinedActions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IProps {
  actionDispatcher: typeof combinedActions;
  shapebox: any;
}

class UIButton extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.selectShape = this.selectShape.bind(this);
    this.delSelectAll = this.delSelectAll.bind(this);
  }
  public componentDidUpdate() {
    setTimeout(() => {
      this.props.shapebox.shapes.map((item: any) => {
        item.render();
      });
    });
  }
  public render() {
    const { shapes } = this.props.shapebox;
    // 第一次render的时候redux没有更新，所以this.props.attrsbox.shapeAttrs为{}，要第二次才可以
    return (
      <div id="editorbox" className="editor-box" onClick={this.delSelectAll}>
        {shapes.map((shape: any, shapeIndex: number) => (
          <div
            key={shapeIndex}
            id={`shape-${shape.attrs.id}`}
            onClick={this.selectShape.bind(this, shape)}
          />
        ))}
      </div>
    );
  }
  private selectShape(shape: any, e: any) {
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
    shapebox: state.shapebox,
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
