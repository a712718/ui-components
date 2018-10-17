import * as React from 'react';
import * as combinedActions from '../ButtonAttrsbox/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Icon } from 'antd';
import * as Interfaces from '../interfaces';
import '../index.less';
interface IProps {
  actionDispatcher: typeof combinedActions;
  attrsbox: Interfaces.IButtonAttrs;
  attrs: Interfaces.IButtonAttrs;
}
const buttonSvg = () => (
  <svg viewBox="0 0 1536 1024" version="1.1" p-id="3488" width="30" height="30">
    <path
      d="M512 134.4a377.6 377.6 0 0 0 0 755.2h512a377.6 377.6 0 0 0 0-755.2H512zM512 0h512a512 512 0 1 1 0 1024H512A512 512 0 1 1 512 0z"
      p-id="3489"
    />
  </svg>
);
class UIButton extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.props.actionDispatcher.setShapeAttrs({
      ...this.props.attrs,
    });
  }
  public render() {
    const { id, text, isShapebox, x, y } = this.props.attrsbox;
    // 第一次render的时候redux没有更新，所以this.props.attrsbox为{}，要第二次才可以
    if (!!id) {
      if (isShapebox) {
        return (
          <div>
            <Icon component={buttonSvg} />
          </div>
        );
      } else {
        return (
          <Button
            style={{
              position: 'absolute',
              left: x,
              top: y,
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
    attrsbox: state.buttonAttrsbox,
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
