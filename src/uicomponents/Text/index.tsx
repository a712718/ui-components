import * as React from 'react';
import * as combinedActions from '../Attrsbox/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'antd';
interface IProps {
  actionDispatcher: typeof combinedActions;
  attrsbox: any;
  attrs: any;
}
class UIText extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      text: this.props.attrsbox.shapeAttrs.text,
    };
    this.setText = this.setText.bind(this);
    this.props.actionDispatcher.setShapeAttrs({
      ...this.props.attrs,
    });
  }
  public render() {
    // console.log(['textarea index shapeAttrs', this.props.attrsbox.shapeAttrs]);
    const { id, isShapebox, start } = this.props.attrsbox.shapeAttrs;
    const { text } = this.state;
    // 第一次render的时候redux没有更新，所以this.props.attrsbox.shapeAttrs为{}，要第二次才可以
    if (!!id) {
      if (isShapebox) {
        return (
          <Input
            type="text"
            style={{
              position: 'absolute',
              left: start.x,
              top: start.y,
              width: 40,
              height: 40,
            }}
            defaultValue={text}
          />
        );
      } else {
        return (
          <Input
            type="text"
            style={{
              position: 'absolute',
              left: start.x,
              top: start.y,
              width: 80,
              height: 80,
            }}
            id={id}
            value={text}
            onChange={this.setText}
            onMouseDown={this.mouseDown}
          />
        );
      }
    } else {
      return '';
    }
  }
  public setText(e: any) {
    // console.log(['text set text', e.target.value]);

    e.persist();
    this.setState({
      text: e.target.value,
    });

    let timer: any = null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.props.actionDispatcher.setShapeAttrs({
        text: e.target.value,
      });
    }, 100);
  }

  public mouseDown(e: any) {
    e.stopPropagation();
  }
}
const mapStateToProps = (state: any) => {
  return { attrsbox: state.attrsbox };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    actionDispatcher: bindActionCreators(combinedActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UIText);
