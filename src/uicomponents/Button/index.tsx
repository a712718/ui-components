import * as React from 'react';
import * as combinedActions from '../Attrsbox/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';

interface IProps {
  actionDispatcher: typeof combinedActions;
  attrsbox: any;
  attrs: any;
}

class UIButton extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.props.actionDispatcher.setShapeAttrs({
      ...this.props.attrs,
    });
  }
  public render() {
    // console.log(['button index shapeAttrs', this.props.attrsbox.shapeAttrs]);
    const { id, text, isShapebox, start } = this.props.attrsbox.shapeAttrs;
    // 第一次render的时候redux没有更新，所以this.props.attrsbox.shapeAttrs为{}，要第二次才可以
    if (!!id) {
      if (isShapebox) {
        return (
          <Button
            style={{
              position: 'absolute',
              left: start.x,
              top: start.y,
            }}
            type="default"
          >
            {text}
          </Button>
        );
      } else {
        return (
          <Button
            style={{
              position: 'absolute',
              left: start.x,
              top: start.y,
            }}
            type="default"
            id={id}
          >
            {text}
          </Button>
        );
      }
    } else {
      return '';
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    attrsbox: state.attrsbox,
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
