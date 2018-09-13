import * as React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { bindActionCreators } from 'redux';
import * as combinedActions from './actions';
interface IProps {
  attrsbox: any;
  actionDispatcher: typeof combinedActions;
}
class UIAttrsbox extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      text: this.props.attrsbox.shapeAttrs.text,
    };
    this.setText = this.setText.bind(this);
  }
  public render() {
    const { shapeAttrs } = this.props.attrsbox;
    return (
      <div>
        <h3>
          text:
          <Input
            placeholder="Basic usage"
            value={this.state.text}
            onChange={this.setText}
            style={{ width: 200 }}
          />
        </h3>
        <h3>{shapeAttrs.id}</h3>
      </div>
    );
  }

  public setText(e: any) {
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
)(UIAttrsbox);
